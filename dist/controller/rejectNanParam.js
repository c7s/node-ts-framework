"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("@c7s/http-errors");
function rejectNanParam(param, value) {
    if (isNaN(value)) {
        throw new http_errors_1.BadRequestError(`${param} must be a number`);
    }
}
exports.rejectNanParam = rejectNanParam;
//# sourceMappingURL=rejectNanParam.js.map