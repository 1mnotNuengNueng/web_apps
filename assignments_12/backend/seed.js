const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old menus and types...');
  await prisma.menu.deleteMany();
  await prisma.type.deleteMany();

  console.log('Creating bakery types...');
  const cakeType = await prisma.type.create({
    data: { name: 'เค้ก' }
  });

  const teaType = await prisma.type.create({
    data: { name: 'ชา' }
  });

  const iceCreamType = await prisma.type.create({
    data: { name: 'ไอศกรีม' }
  });

  console.log('Creating bakery menus matching Neptuny Bakery website...');
  const bakeryFoods = [
    { name: 'เค้กแครอท', price: 50, isBestSeller: true, typeId: cakeType.typeId },
    { name: 'เค้กมัทฉะ', price: 50, isBestSeller: true, typeId: cakeType.typeId },
    { name: 'เค้กฟักทอง', price: 50, isBestSeller: false, typeId: cakeType.typeId },
    { name: 'แครอทลาเต้', price: 50, isBestSeller: false, typeId: teaType.typeId },
    { name: 'มัทฉะลาเต้', price: 50, isBestSeller: true, typeId: teaType.typeId },
    { name: 'ฟักทองลาเต้', price: 50, isBestSeller: false, typeId: teaType.typeId },
    { name: 'ไอศกรีมแครอท', price: 50, isBestSeller: false, typeId: iceCreamType.typeId },
    { name: 'ไอศกรีมมัทฉะ', price: 50, isBestSeller: true, typeId: iceCreamType.typeId },
    { name: 'ไอศกรีมฟักทอง', price: 50, isBestSeller: false, typeId: iceCreamType.typeId },
  ];

  for (const food of bakeryFoods) {
    await prisma.menu.create({
      data: food
    });
  }

  console.log('Seeded 9 Neptuny Bakery menu items successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
