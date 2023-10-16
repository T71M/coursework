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
exports.RegionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const validate_data_1 = require("../utils/validate-data");
let RegionsService = class RegionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRegionDto) {
        await (0, validate_data_1.validateData)(createRegionDto);
        return await this.prisma.region.create({ data: createRegionDto });
    }
    async findAll() {
        return await this.prisma.region.findMany();
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.NotFoundException('Region with that id not found');
        }
        return await this.prisma.region.findUnique({ where: { id } });
    }
    async update(id, updateRegionDto) {
        await (0, validate_data_1.validateData)(updateRegionDto);
        return await this.prisma.region.update({
            data: updateRegionDto,
            where: { id },
        });
    }
    async remove(id) {
        if (!id) {
            throw new common_1.NotFoundException('');
        }
        const res = await this.prisma.region.delete({ where: { id } });
        return res;
    }
    async getAllCities(regionId) {
        const res = await this.prisma.point.findMany({ where: { regionId } });
        return res;
    }
};
RegionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RegionsService);
exports.RegionsService = RegionsService;
//# sourceMappingURL=regions.service.js.map