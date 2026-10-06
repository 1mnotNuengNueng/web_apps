const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllTypes = async (req, res) => {
  try {
    const types = await prisma.type.findMany();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createType = async (req, res) => {
  try {
    const { name } = req.body;
    const type = await prisma.type.create({
      data: { name },
    });
    res.status(201).json(type);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await prisma.type.findUnique({
      where: { typeId: parseInt(id) },
    });
    if (type) res.json(type);
    else res.status(404).json({ error: 'Type not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
