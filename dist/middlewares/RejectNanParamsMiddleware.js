"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const http_errors_1 = require("@c7s/http-errors");
let RejectNanParamsMiddleware = class RejectNanParamsMiddleware {
    use(request, {}, next) {
        for (const param in Object.keys(request.params)) {
            console.log('param');
            console.log(param);
            console.log(request.params[param]);
            console.log(typeof request.params[param]);
            console.log(isNaN(request.params[param]));
            if ('number' === typeof request.params[param] && isNaN(request.params[param])) {
                throw new http_errors_1.BadRequestError(`Route parameter ${param} must be a number`);
            }
        }
        next();
    }
};
RejectNanParamsMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], RejectNanParamsMiddleware);
exports.RejectNanParamsMiddleware = RejectNanParamsMiddleware;
//# sourceMappingURL=RejectNanParamsMiddleware.js.map