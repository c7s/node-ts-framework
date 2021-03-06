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
const log4js_1 = require("log4js");
const di_1 = require("../di");
class AccessLogMiddlewareFactory {
    create() {
        return log4js_1.connectLogger(this.logger, {
            level: 'auto',
            /* tslint:disable:max-line-length */
            format: ':remote-addr - - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent" :response-time',
        });
    }
}
__decorate([
    di_1.inject(di_1.Type.AccessLogger),
    __metadata("design:type", log4js_1.Logger)
], AccessLogMiddlewareFactory.prototype, "logger", void 0);
exports.AccessLogMiddlewareFactory = AccessLogMiddlewareFactory;
//# sourceMappingURL=AccessLogMiddlewareFactory.js.map