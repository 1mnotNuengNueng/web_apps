const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: { type: true, ratings: { select: { userId: true, value: true } } },
      orderBy: { menuId: 'asc' },
    });
    res.json(menus.map(({ ratings, ...menu }) => ({
      ...menu,
      rating: ratings.length ? ratings.reduce((sum, entry) => sum + entry.value, 0) / ratings.length : null,
      ratingCount: ratings.length,
      myRating: ratings.find((entry) => entry.userId === req.user?.userId)?.value ?? null,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rateMenu = async (req, res) => {
  const menuId = Number(req.params.id);
  const value = Number(req.body.value);
  if (!Number.isInteger(menuId) || !Number.isInteger(value) || value < 1 || value > 5) {
    return res.status(400).json({ error: 'Rating must be 1 to 5' });
  }
  try {
    await prisma.rating.upsert({
      where: { userId_menuId: { userId: req.user.userId, menuId } },
      create: { userId: req.user.userId, menuId, value },
      update: { value },
    });
    res.json({ value });
  } catch (error) {
    if (error.code === 'P2003') return res.status(404).json({ error: 'Menu not found' });
    res.status(500).json({ error: 'Could not save rating' });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const { name, price, isBestSeller, typeId } = req.body;
    const menu = await prisma.menu.create({
      data: {
        name,
        price: parseFloat(price),
        isBestSeller: isBestSeller === true || isBestSeller === 'true',
        typeId: parseInt(typeId),
      },
      include: { type: true },
    });
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await prisma.menu.findUnique({
      where: { menuId: parseInt(id) },
      include: { type: true },
    });
    if (menu) res.json(menu);
    else res.status(404).json({ error: 'Menu not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, isBestSeller, typeId } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (isBestSeller !== undefined) updateData.isBestSeller = isBestSeller === true || isBestSeller === 'true';
    if (typeId !== undefined) updateData.typeId = parseInt(typeId);

    const updatedMenu = await prisma.menu.update({
      where: { menuId: parseInt(id) },
      data: updateData,
      include: { type: true },
    });
    res.json(updatedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.menu.delete({
      where: { menuId: parseInt(id) }
    });
    res.json({ message: 'Menu deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
