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
const routing_controllers_1 = require("routing-controllers");
const http_errors_1 = require("@c7s/http-errors");
const di_1 = require("../di");
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_CODE = 500;
let ErrorHandlingMiddleware = class ErrorHandlingMiddleware {
    error(error, {}, response, next) {
        const extractedError = this.extractError(error);
        this.logError(extractedError);
        const coreHttpError = (extractedError instanceof http_errors_1.HttpError)
            ? extractedError
            : this.createCoreHttpError(extractedError);
        let code;
        let data;
        if (coreHttpError) {
            code = this.identifyHttpCode(coreHttpError);
            data = coreHttpError.data;
        }
        else {
            code = this.identifyHttpCode(extractedError);
            data = extractedError;
        }
        response.status(code).json(data);
        next();
    }
    extractError(error) {
        const anyError = error;
        return (anyError.errors && (anyError.errors instanceof Error))
            ? anyError.errors
            : error;
    }
    logError(error) {
        const code = this.identifyHttpCode(error);
        (code === INTERNAL_SERVER_CODE)
            ? this.logger.fatal(error)
            : this.logger.error(error);
    }
    createCoreHttpError(error) {
        let result = null;
        const code = this.identifyHttpCode(error);
        switch (code) {
            case BAD_REQUEST_CODE:
                const errors = error.errors;
                result = errors
                    ? this.createValidationError(errors, error.paramName)
                    : new http_errors_1.BadRequestError(error.message);
                break;
            case NOT_FOUND_CODE:
                result = new http_errors_1.NotFoundError(error.message);
                break;
            case INTERNAL_SERVER_CODE:
                result = new http_errors_1.InternalServerError(error.message);
                break;
        }
        return result;
    }
    identifyHttpCode(error) {
        let code = INTERNAL_SERVER_CODE;
        if (error instanceof routing_controllers_1.HttpError) {
            code = error.httpCode;
        }
        else if (error instanceof http_errors_1.HttpError) {
            code = error.code;
        }
        return code;
    }
    createValidationError(errors, envelopeName) {
        return new http_errors_1.ClassValidatorError(errors, envelopeName);
    }
};
__decorate([
    di_1.inject(di_1.Type.AppLogger),
    __metadata("design:type", Object)
], ErrorHandlingMiddleware.prototype, "logger", void 0);
ErrorHandlingMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: 'after' })
], ErrorHandlingMiddleware);
exports.ErrorHandlingMiddleware = ErrorHandlingMiddleware;
//# sourceMappingURL=ErrorHandlingMiddleware.js.map