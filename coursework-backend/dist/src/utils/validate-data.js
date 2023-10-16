"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const validateData = async (dto) => {
    const errors = await (0, class_validator_1.validate)(dto);
    if (errors.length) {
        throw new common_1.BadRequestException(errors);
    }
};
exports.validateData = validateData;
//# sourceMappingURL=validate-data.js.map