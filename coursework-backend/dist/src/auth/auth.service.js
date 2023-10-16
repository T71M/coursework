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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const dist_1 = require("@nestjs/jwt/dist");
const exceptions_1 = require("@nestjs/common/exceptions");
const constants_1 = require("../constants");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(user) {
        const token = await this.generateToken(user);
        const foundUser = await this.userService.findOneByEmail(user.email);
        foundUser.password = undefined;
        return { user: foundUser, token };
    }
    async create(user, role) {
        const isEmailExists = await this.checkEmail(user.email);
        if (isEmailExists) {
            throw new exceptions_1.ConflictException('The user with this email already exists');
        }
        const hashedPassword = await this.hashPassword(user.password);
        const userToCreate = await this.userService.create(Object.assign(Object.assign({}, user), { password: hashedPassword, roleId: role !== null && role !== void 0 ? role : constants_1.APP_ROLES.USER }));
        const { password } = userToCreate, result = __rest(userToCreate, ["password"]);
        const token = await this.generateToken(result);
        return { user: result, token };
    }
    async validateUser(email, pass) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return null;
        }
        const passwordMatched = await this.comparePassword(pass, user.password);
        if (!passwordMatched) {
            return null;
        }
        const { password } = user, result = __rest(user, ["password"]);
        return result;
    }
    async checkEmail(email) {
        const found = await this.userService.findOneByEmail(email);
        return !!found;
    }
    getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
    async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }
    async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
    async adminLogin(user) {
        if (user.roleId !== constants_1.APP_ROLES.OPERATOR &&
            user.roleId !== constants_1.APP_ROLES.SUPERADMIN) {
            throw new exceptions_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'You dont have permission',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        const token = await this.generateToken(user);
        const foundUser = await this.userService.findOneByEmail(user.email);
        foundUser.password = undefined;
        return { user: foundUser, token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        dist_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map