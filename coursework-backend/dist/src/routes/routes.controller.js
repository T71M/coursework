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
exports.RoutesController = void 0;
const common_1 = require("@nestjs/common");
const routes_service_1 = require("./routes.service");
const create_route_dto_1 = require("./dto/create-route.dto");
const update_route_dto_1 = require("./dto/update-route.dto");
const swagger_1 = require("@nestjs/swagger");
const route_entity_1 = require("./entities/route.entity");
const route_find_response_dto_1 = require("./dto/route-find-response.dto");
const role_guard_1 = require("../auth/role/role.guard");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const constants_1 = require("../constants");
let RoutesController = class RoutesController {
    constructor(routesService) {
        this.routesService = routesService;
    }
    async create(createRouteDto) {
        return await this.routesService.create(createRouteDto);
    }
    async findAll(query) {
        return await this.routesService.findAll(query);
    }
    async getRandom(date) {
        return await this.routesService.getRandomRoutes(date);
    }
    async searchRoutes(endPoint, date, page, perPage) {
        return await this.routesService.search(endPoint, date, page, perPage);
    }
    findOne(id, date) {
        return this.routesService.findOne(+id, date);
    }
    async update(id, updateRouteDto) {
        return await this.routesService.update(+id, updateRouteDto);
    }
    async remove(id) {
        return await this.routesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    (0, swagger_1.ApiOkResponse)({ type: route_entity_1.RouteEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_route_dto_1.CreateRouteDto]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: route_find_response_dto_1.default }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('random-routes'),
    (0, swagger_1.ApiOkResponse)({ type: route_entity_1.RouteEntity, isArray: true }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getRandom", null);
__decorate([
    (0, common_1.Get)('search-routes'),
    (0, swagger_1.ApiOkResponse)({ type: route_entity_1.RouteEntity, isArray: true }),
    __param(0, (0, common_1.Query)('endPoint')),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('perPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "searchRoutes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: route_entity_1.RouteEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoutesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    (0, swagger_1.ApiOkResponse)({ type: route_entity_1.RouteEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_route_dto_1.UpdateRouteDto]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    (0, swagger_1.ApiOkResponse)({ type: route_entity_1.RouteEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "remove", null);
RoutesController = __decorate([
    (0, common_1.Controller)('routes'),
    (0, swagger_1.ApiTags)('routes'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [routes_service_1.RoutesService])
], RoutesController);
exports.RoutesController = RoutesController;
//# sourceMappingURL=routes.controller.js.map