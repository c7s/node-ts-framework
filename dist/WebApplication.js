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
const express = require("express");
const routing_controllers_1 = require("routing-controllers");
const config_1 = require("@c7s/config");
const Application_1 = require("./Application");
const AccessLogMiddlewareFactory_1 = require("./middlewares/AccessLogMiddlewareFactory");
const di_1 = require("./di");
class WebApplication extends Application_1.Application {
    constructor(modules, middlewares) {
        super(modules);
        this.middlewares = middlewares;
        this.express = express();
    }
    async run() {
        await this.init();
        this.express.use((new AccessLogMiddlewareFactory_1.AccessLogMiddlewareFactory).create());
        routing_controllers_1.useExpressServer(this.express, {
            controllers: this.modules.map(module => module.controllers),
            middlewares: this.middlewares,
            defaultErrorHandler: false,
        });
        const { host, port } = this.config;
        return new Promise((resolve, reject) => {
            this.express
                .listen(port, host, (err) => {
                if (err) {
                    reject(err);
                }
                this.logger.info(`Server started at http://${host}:${port}`);
                resolve();
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
}
__decorate([
    di_1.inject(di_1.Type.ServerConfig),
    __metadata("design:type", config_1.ServerConfig)
], WebApplication.prototype, "config", void 0);
exports.WebApplication = WebApplication;
//# sourceMappingURL=WebApplication.js.map