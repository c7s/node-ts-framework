"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require("cluster");
const WebApplication_1 = require("./WebApplication");
class ClusteredWebApplication extends WebApplication_1.WebApplication {
    async run() {
        await this.init();
        if (cluster.isMaster) {
            const workersCount = this.config.workers;
            this.logger.info(`Starting ${workersCount} workers`);
            for (let i = 0; i < workersCount; i += 1) {
                cluster.fork();
            }
        }
        else {
            super.run();
        }
    }
}
exports.ClusteredWebApplication = ClusteredWebApplication;
//# sourceMappingURL=ClusteredWebApplication.js.map