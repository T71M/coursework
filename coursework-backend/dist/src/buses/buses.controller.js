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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusesController = void 0;
const common_1 = require("@nestjs/common");
const buses_service_1 = require("./buses.service");
const create_bus_dto_1 = require("./dto/create-bus.dto");
const update_bus_dto_1 = require("./dto/update-bus.dto");
const swagger_1 = require("@nestjs/swagger");
const bus_entity_1 = require("./entities/bus.entity");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role/role.guard");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const constants_1 = require("../constants");
let BusesController = class BusesController {
    constructor(busesService) {
        this.busesService = busesService;
    }
    async create(createBusDto) {
        return await this.busesService.create(createBusDto);
    }
    async findAll() {
        return await this.busesService.findAll();
    }
    async connect(busId, comfortId) {
        return await this.busesService.connectComfort(+busId, +comfortId);
    }
    async disconnect(busId, comfortId) {
        return await this.busesService.disconnectComfort(+busId, +comfortId);
    }
    async findOne(id) {
        return await this.busesService.findOne(+id);
    }
    async update(id, updateBusDto) {
        return await this.busesService.update(+id, updateBusDto);
    }
    async remove(id) {
        return await this.busesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_dto_1.CreateBusDto]),
    __metadata("design:returntype", Promise)
], BusesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    (0, swagger_1.ApiOkResponse)({ type: bus_entity_1.BusEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':busId/connect-comfort/:comfortId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    __param(0, (0, common_1.Param)('busId')),
    __param(1, (0, common_1.Param)('comfortId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BusesController.prototype, "connect", null);
__decorate([
    (0, common_1.Patch)(':busId/disconnect-comfort/:comfortId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    __param(0, (0, common_1.Param)('busId')),
    __param(1, (0, common_1.Param)('comfortId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BusesController.prototype, "disconnect", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bus_dto_1.UpdateBusDto]),
    __metadata("design:returntype", Promise)
], BusesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusesController.prototype, "remove", null);
BusesController = __decorate([
    (0, swagger_1.ApiTags)('buses'),
    (0, common_1.Controller)('buses'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [buses_service_1.BusesService])
], BusesController);
exports.BusesController = BusesController;
//# sourceMappingURL=buses.controller.js.map