"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class Module {
    get controllers() {
        return path_1.resolve(this.baseDirectory, 'application/controllers/*.js');
    }
    get migrations() {
        return path_1.resolve(this.baseDirectory, 'infrastructure/migrations/*.js');
    }
    get models() {
        return path_1.resolve(this.baseDirectory, 'infrastructure/models/*.js');
    }
}
exports.Module = Module;
//# sourceMappingURL=Module.js.map