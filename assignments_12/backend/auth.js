const { createHash } = require('node:crypto');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const tokenHash = (token) => createHash('sha256').update(token).digest('hex');

async function loadUser(req, res, next) {
  try {
    const token = req.headers.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith('session='))?.slice(8);
    if (token) {
      const session = await prisma.session.findUnique({
        where: { tokenHash: tokenHash(token) },
        include: { user: true },
      });
      if (session && session.expiresAt > new Date()) req.user = session.user;
    }
    next();
  } catch (error) {
    next(error);
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Please log in' });
    if (role === 'admin' && req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
    next();
  };
}

module.exports = { prisma, tokenHash, loadUser, requireRole };
