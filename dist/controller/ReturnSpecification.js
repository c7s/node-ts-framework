"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Support specifying REST list options:
 * to switch return mode: return=only:count, return=only:searchIndex
 * to return additional fields: return=addition:description,content,commentsCount
 */
class ReturnSpecification {
    constructor(returnSpec) {
        this.additions = [];
        if (returnSpec) {
            const [mode, value] = returnSpec.split(':');
            switch (mode) {
                case 'only':
                    this.onlyValue = value;
                    break;
                case 'addition':
                    this.additions = value.split(',');
                    break;
            }
        }
    }
    only(only) {
        return this.onlyValue === only;
    }
    addition(name) {
        return this.additions.indexOf(name) > -1;
    }
}
exports.ReturnSpecification = ReturnSpecification;
//# sourceMappingURL=ReturnSpecification.js.map