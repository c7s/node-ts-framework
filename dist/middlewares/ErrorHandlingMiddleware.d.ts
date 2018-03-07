/// <reference types="express" />
import { Logger } from 'log4js';
import { Request, Response, NextFunction } from 'express';
import { HttpError as CoreHttpError } from '@c7s/http-errors';
export declare class ErrorHandlingMiddleware implements ErrorHandlingMiddleware {
    protected logger: Logger;
    error(error: Error, {}: Request, response: Response, next: NextFunction): void;
    protected extractError(error: Error): Error;
    protected logError(error: Error): void;
    protected createCoreHttpError(error: Error): CoreHttpError | null;
    protected identifyHttpCode(error: Error): number;
}
