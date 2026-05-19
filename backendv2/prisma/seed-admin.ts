const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function main() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const hash = await bcrypt.hash('admin123', 10);
  
  const existing = await prisma.user.findUnique({ where: { username: 'admin' } });
  if (existing) {
    console.log('Usuario admin ya existe');
  } else {
    await prisma.user.create({
      data: { username: 'admin', password: hash, role: 'admin' },
    });
    console.log('Usuario admin creado: admin / admin123');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
