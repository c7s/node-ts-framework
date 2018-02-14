"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_inject_decorators_1 = require("inversify-inject-decorators");
const Type_1 = require("./Type");
exports.Type = Type_1.Type;
exports.container = new inversify_1.Container({ defaultScope: 'Singleton' });
exports.provide = inversify_binding_decorators_1.makeProvideDecorator(exports.container);
exports.inject = inversify_inject_decorators_1.default(exports.container).lazyInject;
//# sourceMappingURL=di.js.map