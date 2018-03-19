"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../di");
/**
 * Message formatting code copy-pasted from typeorm/src/logger/FileLogger
 */
class TypeormLogger {
    logQuery(query, parameters) {
        const sql = query
            + (parameters && parameters.length ? ' -- PARAMETERS: ' + JSON.stringify(parameters) : '');
        this.logger.debug('[QUERY]: ' + sql);
    }
    logQueryError(error, query, parameters) {
        const sql = query
            + (parameters && parameters.length ? ' -- PARAMETERS: ' + JSON.stringify(parameters) : '');
        this.logger.error(`[FAILED QUERY]: ${sql}`);
        this.logger.error(`[QUERY ERROR]: ${error}`);
    }
    logQuerySlow(time, query, parameters) {
        const sql = query
            + (parameters && parameters.length ? ' -- PARAMETERS: ' + JSON.stringify(parameters) : '');
        this.logger.warn(`[SLOW QUERY: ${time} ms]: ` + sql);
    }
    logSchemaBuild(message) {
        this.logger.debug(message);
    }
    logMigration(message) {
        this.logger.info(message);
    }
    log(level, message) {
        this.logger.log(level, message);
    }
}
__decorate([
    di_1.inject(di_1.Type.DbLogger),
    __metadata("design:type", Object)
], TypeormLogger.prototype, "logger", void 0);
exports.TypeormLogger = TypeormLogger;
//# sourceMappingURL=TypeormLogger.js.map