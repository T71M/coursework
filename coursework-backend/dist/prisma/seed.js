"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map