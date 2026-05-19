const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function main() {
  const prisma = new PrismaClient();
  await prisma.$connect();
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'pepe' },
    update: { password: hash, role: 'admin' },
    create: { username: 'pepe', password: hash, role: 'admin' },
  });
  await prisma.$disconnect();
}

main();
