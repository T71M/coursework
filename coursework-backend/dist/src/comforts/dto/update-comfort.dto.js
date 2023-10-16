"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComfortDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_comfort_dto_1 = require("./create-comfort.dto");
class UpdateComfortDto extends (0, swagger_1.PartialType)(create_comfort_dto_1.CreateComfortDto) {
}
exports.UpdateComfortDto = UpdateComfortDto;
//# sourceMappingURL=update-comfort.dto.js.map