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
exports.PointsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const validate_data_1 = require("../utils/validate-data");
let PointsService = class PointsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPointDto) {
        await (0, validate_data_1.validateData)(createPointDto);
        return await this.prisma.point.create({
            data: createPointDto,
        });
    }
    findAll() {
        return this.prisma.point.findMany({ include: { region: true } });
    }
    async findOne(id) {
        return await this.prisma.point.findUnique({ where: { id } });
    }
    async update(id, updatePointDto) {
        await (0, validate_data_1.validateData)(updatePointDto);
        if (!id)
            throw new common_1.NotFoundException('Point with that id not found');
        return await this.prisma.point.update({
            data: updatePointDto,
            where: { id },
        });
    }
    async remove(id) {
        return await this.prisma.point.delete({ where: { id } });
    }
};
PointsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PointsService);
exports.PointsService = PointsService;
//# sourceMappingURL=points.service.js.map