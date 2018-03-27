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
const log4js = require("log4js");
const inversify_1 = require("inversify");
const deepExtend = require("deep-extend");
const config_1 = require("@c7s/config");
const di_1 = require("../di");
let LoggerFactory = LoggerFactory_1 = class LoggerFactory {
    constructor(log4jsConfig) {
        log4js.configure(deepExtend({
            appenders: {
                everything: LoggerFactory_1.getAppenderFromConfig(this.logConfig.main),
                access: LoggerFactory_1.getAppenderFromConfig(this.logConfig.access),
            },
            categories: {
                default: { appenders: ['everything'], level: this.logConfig.main.level },
                db: { appenders: ['everything'], level: this.logConfig.main.level },
                access: { appenders: ['access'], level: this.logConfig.access.level },
            },
        }, log4jsConfig));
    }
    create(category) {
        return log4js.getLogger(category);
    }
    static getAppenderFromConfig(categoryConfig) {
        return {
            file: {
                type: 'file',
                filename: categoryConfig.filename,
                maxLogSize: 50 * 1024 * 1024,
                backups: 10,
                compress: true,
            },
            dateFile: {
                type: 'dateFile',
                filename: categoryConfig.filename,
                daysToKeep: 10,
                compress: true,
            },
            console: {
                type: 'console',
            },
        }[categoryConfig.type];
    }
};
__decorate([
    di_1.inject(di_1.Type.LogConfig),
    __metadata("design:type", config_1.LogConfig)
], LoggerFactory.prototype, "logConfig", void 0);
LoggerFactory = LoggerFactory_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object])
], LoggerFactory);
exports.LoggerFactory = LoggerFactory;
var LoggerFactory_1;
//# sourceMappingURL=LoggerFactory.js.map