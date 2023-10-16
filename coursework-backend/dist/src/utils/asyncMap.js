"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncMap = void 0;
async function asyncMap(array, asyncCallback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        const mappedValue = await asyncCallback(value, i, array);
        result.push(mappedValue);
    }
    return result;
}
exports.asyncMap = asyncMap;
//# sourceMappingURL=asyncMap.js.map