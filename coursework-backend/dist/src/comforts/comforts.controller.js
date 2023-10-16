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
exports.ComfortsController = void 0;
const common_1 = require("@nestjs/common");
const comforts_service_1 = require("./comforts.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role/role.guard");
const constants_1 = require("../constants");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
let ComfortsController = class ComfortsController {
    constructor(comfortsService) {
        this.comfortsService = comfortsService;
    }
    async findAll() {
        return await this.comfortsService.findAll();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(constants_1.APP_ROLES.OPERATOR, constants_1.APP_ROLES.SUPERADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComfortsController.prototype, "findAll", null);
ComfortsController = __decorate([
    (0, common_1.Controller)('comforts'),
    (0, swagger_1.ApiTags)('bus comforts'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [comforts_service_1.ComfortsService])
], ComfortsController);
exports.ComfortsController = ComfortsController;
//# sourceMappingURL=comforts.controller.js.map