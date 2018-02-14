"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require("cluster");
const WebApplication_1 = require("./WebApplication");
class ClusteredWebApplication extends WebApplication_1.WebApplication {
    run() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            if (cluster.isMaster) {
                const workersCount = this.config.workers;
                this.logger.info(`Starting ${workersCount} workers`);
                for (let i = 0; i < workersCount; i += 1) {
                    cluster.fork();
                }
            }
            else {
                _super("run").call(this);
            }
        });
    }
}
exports.ClusteredWebApplication = ClusteredWebApplication;
//# sourceMappingURL=ClusteredWebApplication.js.map