"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const stripTags = require("striptags");
/* tslint:disable-next-line:function-name */
function StripTags(options) {
    return class_transformer_1.Transform(value => undefined !== value && null !== value ? stripTags(value) : value, options);
}
exports.StripTags = StripTags;
//# sourceMappingURL=StripTags.js.map