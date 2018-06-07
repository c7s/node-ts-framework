"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
/* tslint:disable-next-line:function-name */
function Trim(options) {
    return class_transformer_1.Transform(value => undefined !== value && null !== value ? value.trim() : value, options);
}
exports.Trim = Trim;
//# sourceMappingURL=Trim.js.map