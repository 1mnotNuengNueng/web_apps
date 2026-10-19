const { prisma } = require('./auth');
const { hashPassword } = require('./routes/authRoutes');

async function main() {
  for (const role of ['admin', 'user']) {
    const email = process.env[`${role.toUpperCase()}_EMAIL`]?.trim().toLowerCase();
    const password = process.env[`${role.toUpperCase()}_PASSWORD`];
    const name = process.env[`${role.toUpperCase()}_NAME`] || role;
    if (!email || !password || password.length < 8) throw new Error(`Set ${role.toUpperCase()}_EMAIL and ${role.toUpperCase()}_PASSWORD (8+ characters)`);
    const passwordHash = hashPassword(password);
    await prisma.user.upsert({
      where: { email },
      create: { email, name, role, passwordHash },
      update: { passwordHash },
    });
    console.log(`Ready: ${role} account ${email}`);
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
