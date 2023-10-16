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
exports.RoutesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const dayjs = require("dayjs");
const class_validator_1 = require("class-validator");
const validate_data_1 = require("../utils/validate-data");
const asyncMap_1 = require("../utils/asyncMap");
let RoutesService = class RoutesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRouteDto) {
        const startPoint = await this.prisma.point.findUnique({
            where: { name: 'Донецк' },
        });
        const data = Object.assign(Object.assign({}, createRouteDto), { startPointId: startPoint.id });
        createRouteDto = data;
        const errors = await (0, class_validator_1.validate)(createRouteDto);
        if (errors.length) {
            throw new common_1.BadRequestException(errors);
        }
        const res = await this.prisma.route.create({
            data: createRouteDto,
        });
        return res;
    }
    async findAll(query) {
        const endId = Number(query.endPointId);
        const startId = Number(query.startPointId);
        const totalItems = await this.prisma.route.count({
            where: {
                endPointId: !isNaN(endId) ? endId : undefined,
                startPointId: !isNaN(startId) ? startId : undefined,
                weekDayStart: query.weekDayStart,
                weekDayStop: query.weekDayEnd,
                name: { contains: query.search },
            },
        });
        const skip = isNaN((Number(query.page) - 1) * Number(query.perPage))
            ? undefined
            : (Number(query.page) - 1) * Number(query.perPage);
        const take = isNaN(Number(query.perPage))
            ? undefined
            : Number(query.perPage);
        const res = await this.prisma.route.findMany({
            skip,
            take,
            where: {
                endPointId: !isNaN(endId) ? endId : undefined,
                startPointId: !isNaN(startId) ? startId : undefined,
                weekDayStart: query.weekDayStart,
                weekDayStop: query.weekDayEnd,
                name: { contains: query.search, mode: 'insensitive' },
            },
            include: {
                endPoint: { include: { region: true } },
                startPoint: {
                    include: {
                        region: true,
                    },
                },
                bus: true,
            },
        });
        const date = query.date ? dayjs(query.date).toDate() : undefined;
        if (date) {
            await (0, asyncMap_1.asyncMap)(res, async (v, i) => {
                const orders = await this.prisma.order.findMany({
                    where: { routeId: v.id, date: date },
                });
                console.debug(orders);
                let freeSeats = v.bus.seats_count;
                orders.map((v) => {
                    freeSeats -= v.seat_count;
                });
                res[i].freeSeats = freeSeats;
            });
        }
        const meta = {
            totalItems,
            totalPages: Math.ceil(totalItems / +query.perPage),
        };
        return { meta, data: res };
    }
    async findOne(id, date) {
        const res = await this.prisma.route.findUniqueOrThrow({
            where: { id },
            include: {
                bus: true,
                startPoint: { include: { region: true } },
                endPoint: { include: { region: true } },
            },
        });
        if (!res) {
            throw new common_1.NotFoundException('route not found');
        }
        const localDate = date ? dayjs(date).toDate() : undefined;
        const orders = await this.prisma.order.findMany({
            where: {
                routeId: res.id,
                date: localDate,
            },
        });
        console.debug(orders);
        let freeSeats = res.bus.seats_count;
        orders.map((v) => {
            freeSeats -= v.seat_count;
        });
        res.freeSeats = freeSeats;
        return res;
    }
    async update(id, updateRouteDto) {
        await (0, validate_data_1.validateData)(updateRouteDto);
        const res = await this.prisma.route.updateMany({
            data: updateRouteDto,
            where: { id },
        });
        return res;
    }
    async remove(id) {
        const res = await this.prisma.route.delete({
            where: { id },
        });
        return res;
    }
    async getRandomRoutes(date) {
        const count = await this.prisma.route.count();
        const skip = count > 10 ? Math.floor(Math.random() * count) : 0;
        const day = this.getWeekDay(dayjs(date).day());
        const res = await this.prisma.route.findMany({
            take: 10,
            skip,
            orderBy: {
                name: 'asc',
            },
            where: {
                weekDayStart: day,
            },
            include: {
                bus: true,
                endPoint: { include: { region: true } },
                startPoint: {
                    include: {
                        region: true,
                    },
                },
            },
        });
        const data = date ? dayjs(date).toDate() : undefined;
        if (date) {
            await (0, asyncMap_1.asyncMap)(res, async (v, i) => {
                const orders = await this.prisma.order.findMany({
                    where: { routeId: v.id, date: data },
                });
                console.debug(orders);
                let freeSeats = v.bus.seats_count;
                orders.map((v) => {
                    freeSeats -= v.seat_count;
                });
                res[i].freeSeats = freeSeats;
            });
        }
        return res;
    }
    async search(endPoint, date, page, perPage) {
        const startPoint = await this.prisma.point.findUnique({
            where: { name: 'Донецк' },
        });
        const startWeekDay = this.getWeekDay(dayjs(date).day());
        const res = await this.findAll({
            startPointId: String(startPoint.id),
            weekDayStart: startWeekDay,
            endPointId: endPoint,
            page: page,
            perPage: perPage,
            date: date,
        });
        return res;
    }
    getWeekDay(day) {
        const weekdays = [
            'SUNDAY',
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
        ];
        return weekdays[day];
    }
};
RoutesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoutesService);
exports.RoutesService = RoutesService;
//# sourceMappingURL=routes.service.js.map