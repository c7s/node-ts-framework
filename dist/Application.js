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
const di_1 = require("./di");
class Application {
    constructor(modules) {
        this.isInitialized = false;
        this.modules = modules;
    }
    async init() {
        if (this.isInitialized) {
            return;
        }
        for (const module of this.modules) {
            await module.initDiContainer(di_1.container, this.modules);
        }
        this.isInitialized = true;
    }
    async end() {
        if (!this.isInitialized) {
            return;
        }
        await Promise.all(this.modules.map(module => module.end(di_1.container)));
    }
    async run(callback) {
        try {
            await this.init();
            const result = callback();
            if (result instanceof Promise) {
                await result;
            }
            await this.end();
        }
        catch (e) {
            this.logger.error(e);
            await this.end();
            process.exit(1);
        }
    }
}
__decorate([
    di_1.inject(di_1.Type.AppLogger),
    __metadata("design:type", log4js_1.Logger)
], Application.prototype, "logger", void 0);
exports.Application = Application;
//# sourceMappingURL=Application.js.map