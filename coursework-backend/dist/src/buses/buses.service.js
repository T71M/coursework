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
exports.BusesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const validate_data_1 = require("../utils/validate-data");
let BusesService = class BusesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBusDto) {
        var _a;
        await (0, validate_data_1.validateData)(createBusDto);
        const data = Object.assign(Object.assign({}, createBusDto), { comforts: undefined });
        const res = await this.prisma.bus.create({
            data: Object.assign(Object.assign({}, data), { comforts: {
                    create: (_a = createBusDto.comforts) === null || _a === void 0 ? void 0 : _a.map((comfortId) => {
                        return {
                            comfortId,
                        };
                    }),
                } }),
        });
        return { bus: res };
    }
    async findAll() {
        const res = await this.prisma.bus.findMany();
        return res;
    }
    async findOne(id) {
        const res = await this.prisma.bus.findUnique({
            where: { id },
            include: {
                comforts: {
                    include: {
                        comfort: true,
                    },
                },
            },
        });
        return { bus: res };
    }
    async update(id, updateBusDto) {
        await (0, validate_data_1.validateData)(updateBusDto);
        const data = Object.assign(Object.assign({}, updateBusDto), { comforts: undefined });
        const res = await this.prisma.bus.update({
            where: { id },
            data: data,
        });
        return res;
    }
    async remove(id) {
        const res = await this.prisma.bus.delete({ where: { id } });
        return res;
    }
    async connectComfort(busId, comfortId) {
        if (!busId || !comfortId)
            throw new common_1.BadRequestException('busId or comfortId are empty!');
        const res = await this.prisma.bus.update({
            where: { id: busId },
            data: {
                comforts: {
                    connectOrCreate: {
                        where: { busId_comfortId: { busId, comfortId } },
                        create: { comfortId },
                    },
                },
            },
        });
        return res;
    }
    async disconnectComfort(busId, comfortId) {
        if (!busId || !comfortId)
            throw new common_1.BadRequestException('busId or comfortId are empty!');
        const res = await this.prisma.bus.update({
            where: { id: busId },
            data: {
                comforts: {
                    delete: { busId_comfortId: { busId, comfortId } },
                },
            },
        });
        return res;
    }
};
BusesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BusesService);
exports.BusesService = BusesService;
//# sourceMappingURL=buses.service.js.map