import { Logger } from 'log4js';
import { Request, Response, NextFunction } from 'express';
import { Middleware, HttpError } from 'routing-controllers';
import { ValidationError } from 'class-validator';
import {
  HttpError as CoreHttpError,
  NotFoundError,
  InternalServerError,
  ClassValidatorError,
  BadRequestError,
} from '@c7s/http-errors';
import { inject, Type } from '../di';

const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_CODE = 500;

@Middleware({ type: 'after' })
export class ErrorHandlingMiddleware implements ErrorHandlingMiddleware {
  @inject(Type.AppLogger)
  protected logger!: Logger;

  public error(error: Error, {}: Request, response: Response, next: NextFunction) {
    const extractedError = this.extractError(error);
    this.logError(extractedError);

    const coreHttpError = (extractedError instanceof CoreHttpError)
      ? extractedError
      : this.createCoreHttpError(extractedError);

    let code: number;
    let data: any;
    if (coreHttpError) {
      code = this.identifyHttpCode(coreHttpError);
      data = coreHttpError.data;
    } else {
      code = this.identifyHttpCode(extractedError);
      data = extractedError;
    }

    response.status(code).json(data);
    next();
  }

  protected extractError(error: Error): Error {
    const anyError: any = error;
    return (anyError.errors && (anyError.errors instanceof Error))
      ? anyError.errors
      : error;
  }

  protected logError(error: Error): void {
    const code = this.identifyHttpCode(error);
    (code === INTERNAL_SERVER_CODE)
      ? this.logger.fatal(error as any)
      : this.logger.error(error as any);
  }

  protected createCoreHttpError(error: Error): CoreHttpError | null {
    let result = null;
    const code = this.identifyHttpCode(error);

    switch (code) {
      case BAD_REQUEST_CODE:
        const errors = (error as any).errors;
        result = errors
          ? this.createValidationError(errors, (error as any).paramName)
          : new BadRequestError(error.message);
        break;

      case NOT_FOUND_CODE:
        result = new NotFoundError(error.message);
        break;

      case INTERNAL_SERVER_CODE:
        result = new InternalServerError(error.message);
        break;
    }

    return result;
  }

  protected identifyHttpCode(error: Error): number {
    let code = INTERNAL_SERVER_CODE;
    if (error instanceof HttpError) {
      code = error.httpCode;
    } else if (error instanceof CoreHttpError) {
      code = error.code;
    }
    return code;
  }

  protected createValidationError(errors: ValidationError[], envelopeName: string) {
    return new ClassValidatorError(errors, envelopeName);
  }

}
