const express = require('express');
const { randomBytes, scryptSync, timingSafeEqual } = require('node:crypto');
const { prisma, tokenHash, requireRole } = require('../auth');

const router = express.Router();
const publicUser = (user) => ({ userId: user.userId, name: user.name, email: user.email, role: user.role });
const hashPassword = (password, salt = randomBytes(16).toString('hex')) => `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
const validPassword = (password, stored) => {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

router.get('/me', (req, res) => res.json(req.user ? publicUser(req.user) : null));

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string') return res.status(400).json({ error: 'Email and password required' });
    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user || !validPassword(password, user.passwordHash)) return res.status(401).json({ error: 'Invalid email or password' });
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.session.create({ data: { tokenHash: tokenHash(token), userId: user.userId, expiresAt } });
    res.cookie('session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', expires: expiresAt, path: '/' });
    res.json(publicUser(user));
  } catch (error) { next(error); }
});

router.post('/logout', async (req, res, next) => {
  try {
    const token = req.headers.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith('session='))?.slice(8);
    if (token) await prisma.session.deleteMany({ where: { tokenHash: tokenHash(token) } });
    res.clearCookie('session', { path: '/' });
    res.sendStatus(204);
  } catch (error) { next(error); }
});

router.get('/users', requireRole('admin'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({ select: { userId: true, name: true, email: true, role: true }, orderBy: { userId: 'asc' } });
    res.json(users);
  } catch (error) { next(error); }
});

router.patch('/users/:id/role', requireRole('admin'), async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    if (!Number.isInteger(userId) || !['user', 'admin'].includes(req.body.role)) return res.status(400).json({ error: 'Invalid role or user' });
    if (userId === req.user.userId && req.body.role !== 'admin') return res.status(400).json({ error: 'Cannot remove your own admin role' });
    const user = await prisma.user.update({ where: { userId }, data: { role: req.body.role } });
    res.json(publicUser(user));
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    next(error);
  }
});

module.exports = { router, hashPassword };
