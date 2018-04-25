"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodashIsstring = require("lodash.isstring");
const stripTags = require("striptags");
function objectStripTags(object, attributes) {
    for (const attribute in Object.keys(object)) {
        if (undefined !== attributes && -1 === attributes.indexOf(attribute)) {
            continue;
        }
        if (!lodashIsstring(object[attribute])) {
            continue;
        }
        object[attribute] = stripTags(object[attribute]);
    }
}
exports.objectStripTags = objectStripTags;
//# sourceMappingURL=objectStripTags.js.map