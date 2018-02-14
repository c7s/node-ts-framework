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
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const config_1 = require("@c7s/config");
const di_1 = require("../di");
const TypeormLogger_1 = require("../log/TypeormLogger");
/**
 * TODO custom logger, timezone
 */
let DbConnectionFactory = class DbConnectionFactory {
    create(modules) {
        return typeorm_1.createConnection(Object.assign({}, this.dbConfig, { logging: this.dbConfig.logging, logger: new TypeormLogger_1.TypeormLogger, migrations: modules.map(module => module.migrations), entities: modules.map(module => module.models) }));
    }
};
__decorate([
    di_1.inject(di_1.Type.DbConfig),
    __metadata("design:type", config_1.DbConfig)
], DbConnectionFactory.prototype, "dbConfig", void 0);
DbConnectionFactory = __decorate([
    inversify_1.injectable()
], DbConnectionFactory);
exports.DbConnectionFactory = DbConnectionFactory;
//# sourceMappingURL=DbConnectionFactory.js.map