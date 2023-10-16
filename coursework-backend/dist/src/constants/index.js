"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ROLES = exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'testSecret',
};
var APP_ROLES;
(function (APP_ROLES) {
    APP_ROLES[APP_ROLES["SUPERADMIN"] = 1] = "SUPERADMIN";
    APP_ROLES[APP_ROLES["OPERATOR"] = 2] = "OPERATOR";
    APP_ROLES[APP_ROLES["USER"] = 3] = "USER";
})(APP_ROLES = exports.APP_ROLES || (exports.APP_ROLES = {}));
//# sourceMappingURL=index.js.map