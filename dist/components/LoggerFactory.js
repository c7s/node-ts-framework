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
const config_1 = require("@c7s/config");
const di_1 = require("../di");
/**
 * TODO custom logger, timezone
 */
let LoggerFactory = class LoggerFactory {
    constructor() {
        log4js.configure({
            appenders: {
                everything: this.getAppenderFromConfig(this.logConfig.main),
                access: this.getAppenderFromConfig(this.logConfig.access),
            },
            categories: {
                default: { appenders: ['everything'], level: this.logConfig.main.level },
                access: { appenders: ['access'], level: this.logConfig.access.level },
            },
        });
    }
    create(category) {
        return log4js.getLogger(category);
    }
    getAppenderFromConfig(categoryConfig) {
        return {
            file: {
                type: 'dateFile',
                filename: categoryConfig.filename,
                daysToKeep: 10,
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
LoggerFactory = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], LoggerFactory);
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map
