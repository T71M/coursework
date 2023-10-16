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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("../constants");
const validate_data_1 = require("../utils/validate-data");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        await (0, validate_data_1.validateData)(createUserDto);
        const res = await this.prisma.user.create({
            data: createUserDto,
        });
        return res;
    }
    async findAll(query) {
        const OR = !!query.search
            ? [
                { firstname: { contains: query.search } },
                { lastname: { contains: query.search } },
                { surname: { contains: query.search } },
                { email: { contains: query.search } },
            ]
            : undefined;
        const totalItems = await this.prisma.user.count({
            where: {
                roleId: constants_1.APP_ROLES.USER,
                OR,
            },
        });
        const res = await this.prisma.user.findMany({
            where: {
                roleId: constants_1.APP_ROLES.USER,
                OR,
            },
            skip: (Number(query.page) - 1) * Number(query.perPage),
            take: Number(query.perPage),
            select: {
                id: true,
                role: true,
                roleId: true,
                firstname: true,
                lastname: true,
                surname: true,
                email: true,
                password: false,
            },
        });
        const meta = {
            totalItems,
            totalPages: Math.ceil(totalItems / +query.perPage),
        };
        return { meta, data: res };
    }
    findOne(id) {
        if (typeof id !== 'number' || isNaN(id)) {
            return null;
        }
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                role: true,
                roleId: true,
                firstname: true,
                lastname: true,
                surname: true,
                email: true,
                password: false,
            },
        });
    }
    findOneByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async update(id, updateUserDto) {
        await (0, validate_data_1.validateData)(updateUserDto);
        const res = await this.prisma.user.update({
            data: updateUserDto,
            where: { id },
        });
        return res;
    }
    async remove(id) {
        return await this.prisma.user.delete({
            where: { id },
        });
    }
    async getAllOperators(query) {
        const OR = !!query.search
            ? [
                { firstname: { contains: query.search } },
                { lastname: { contains: query.search } },
                { surname: { contains: query.search } },
                { email: { contains: query.search } },
            ]
            : undefined;
        const totalItems = await this.prisma.user.count({
            where: {
                roleId: constants_1.APP_ROLES.OPERATOR,
                OR,
            },
        });
        const res = await this.prisma.user.findMany({
            where: {
                roleId: constants_1.APP_ROLES.OPERATOR,
                OR,
            },
            skip: (Number(query.page) - 1) * Number(query.perPage),
            take: Number(query.perPage),
            select: {
                id: true,
                role: true,
                roleId: true,
                firstname: true,
                lastname: true,
                surname: true,
                email: true,
                password: false,
            },
        });
        const meta = {
            totalItems,
            totalPages: Math.ceil(totalItems / +query.perPage),
        };
        return { meta, data: res };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map