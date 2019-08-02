"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const stripTags = require("striptags");
/* tslint:disable-next-line:function-name */
function StripTags(options, stripTagsOptions) {
    return class_transformer_1.Transform((value) => {
        if (stripTagsOptions && stripTagsOptions.each) {
            if (Array.isArray(value)) {
                return value.map(stripTagsWrapper);
            }
        }
        else {
            return stripTagsWrapper(value);
        }
    }, options);
}
exports.StripTags = StripTags;
function stripTagsWrapper(value) {
    return undefined !== value && null !== value ? stripTags(value) : value;
}
//# sourceMappingURL=StripTags.js.map