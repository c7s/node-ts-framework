"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
/* tslint:disable-next-line:function-name */
function Trim(options, trimOptions) {
    return class_transformer_1.Transform((value) => {
        if (trimOptions && trimOptions.each) {
            if (Array.isArray(value)) {
                return value.map(trimWrapper);
            }
        }
        else {
            return trimWrapper(value);
        }
    }, options);
}
exports.Trim = Trim;
function trimWrapper(value) {
    return value ? value.trim() : value;
}
//# sourceMappingURL=Trim.js.map