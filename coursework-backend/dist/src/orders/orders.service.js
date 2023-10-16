"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const dayjs = require("dayjs");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        const res = await this.prisma.order.create({ data: createOrderDto });
        return res;
    }
    async findAll(query) {
        let formattedDate;
        if (query.date) {
            formattedDate = dayjs(query.date).toDate();
        }
        const user = query.userId ? +query.userId : undefined;
        const route = query.routeId ? +query.routeId : undefined;
        const totalItems = await this.prisma.order.count({
            where: {
                date: formattedDate,
                userId: user,
                routeId: route,
            },
        });
        const res = await this.prisma.order.findMany({
            skip: (Number(query.page) - 1) * Number(query.perPage),
            take: Number(query.perPage),
            where: {
                date: formattedDate,
                userId: user,
                routeId: route,
            },
            include: {
                route: {
                    include: {
                        bus: true,
                        startPoint: {
                            include: {
                                region: true,
                            },
                        },
                        endPoint: { include: { region: true } },
                    },
                },
            },
        });
        const meta = {
            totalItems,
            totalPages: Math.ceil(totalItems / +query.perPage),
        };
        return { data: res, meta };
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    async update(id, updateOrderDto) {
        const res = await this.prisma.order.update({
            where: { id },
            data: updateOrderDto,
        });
        return res;
    }
    async remove(id) {
        const res = await this.prisma.order.delete({ where: { id } });
        return res;
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map