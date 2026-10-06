const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Types
  const dessertType = await prisma.type.create({
    data: { name: 'Dessert' }
  });
  
  const bakeryType = await prisma.type.create({
    data: { name: 'Bakery' }
  });
  
  const drinkType = await prisma.type.create({
    data: { name: 'Drink' }
  });

  // Create Menus
  const foods = [
    { name: "cake", price: 35, isBestSeller: true, typeId: dessertType.typeId },
    { name: "bread", price: 25, isBestSeller: false, typeId: bakeryType.typeId },
    { name: "milk", price: 15, isBestSeller: true, typeId: drinkType.typeId },
    { name: "donut", price: 45, isBestSeller: false, typeId: dessertType.typeId },
    { name: "cookie", price: 55, isBestSeller: true, typeId: dessertType.typeId },
  ];

  for (const food of foods) {
    await prisma.menu.create({
      data: food
    });
  }

  console.log('Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
