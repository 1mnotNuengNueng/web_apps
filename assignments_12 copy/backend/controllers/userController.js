const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { userId: Number(id) } // schema ใช้ userId
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: { name, email, passwordHash: password, role: role || 'user' }
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { userId: Number(id) }
        });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(404).json({ error: 'User not found' });
    }
};

module.exports = { getUser, getUserById, createUser, deleteUser };
