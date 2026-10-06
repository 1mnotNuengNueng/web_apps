const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: { type: true },
    });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const { name, price, isBestSeller, typeId } = req.body;
    const menu = await prisma.menu.create({
      data: {
        name,
        price,
        isBestSeller: isBestSeller || false,
        typeId,
      },
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
