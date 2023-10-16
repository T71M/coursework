// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        name: 'SUPERADMIN',
        description: 'allmight',
      },
      {
        name: 'OPERATOR',
        description: 'halfmight',
      },
      {
        name: 'USER',
        description: 'user',
      },
    ],
  });
  await prisma.region.createMany({
    data: [
      {
        name: 'ДНР',
      },
      {
        name: 'Краснодарский край',
      },
      {
        name: 'Ростовская область',
      },
    ],
  });

  await prisma.point.createMany({
    data: [
      {
        name: 'Донецк',
        regionId: 1,
      },
      {
        name: 'Макеевка',
        regionId: 1,
      },
      {
        name: 'Ясиноватая',
        regionId: 1,
      },
      {
        name: 'Ростов',
        regionId: 3,
      },
      {
        name: 'Таганрог',
        regionId: 3,
      },
      {
        name: 'Краснодар',
        regionId: 2,
      },
      {
        name: 'Новороссийск',
        regionId: 2,
      },
      {
        name: 'Сочи',
        regionId: 2,
      },
    ],
  });

  await prisma.busComfort.createMany({
    data: [
      {
        name: 'Зарядные устройства',
      },
      {
        name: 'Кондиционер',
      },
      {
        name: 'Туалет',
      },
      {
        name: 'WIFI',
      },
    ],
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
