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
  EntityTooLargeError,
} from '@c7s/http-errors';
import { inject, Type } from '../di';

enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
  InternalServer = 500,
  EntityTooLarge = 413,
}

type BodyParserError = {
  status: number,
  type: 'entity.too.large'
    | 'encoding.unsupported'
    | 'request.aborted'
    | 'request.size.invalid'
    | 'stream.encoding.set'
    | 'parameters.too.many'
    | 'charset.unsupported'
    | 'encoding.unsupported';
  limit?: number;
  expected?: number;
  length?: number;
};

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
    (code === HttpCode.InternalServer)
      ? this.logger.fatal(error as any)
      : this.logger.error(error as any);
  }

  protected createCoreHttpError(error: Error): CoreHttpError | null {
    let result = null;
    const code = this.identifyHttpCode(error);

    switch (code) {
      case HttpCode.BadRequest:
        const errors = (error as any).errors;
        result = errors
          ? this.createValidationError(errors, (error as any).paramName)
          : new BadRequestError(error.message);
        break;

      case HttpCode.NotFound:
        result = new NotFoundError(error.message);
        break;

      case HttpCode.InternalServer:
        result = new InternalServerError(error.message);
        break;

      case HttpCode.EntityTooLarge:
        const bodyParserError = error as any as BodyParserError;
        if (undefined !== bodyParserError.limit && undefined !== bodyParserError.length) {
          result = new EntityTooLargeError(
            `${error.message} (request ${bodyParserError.length}, limit ${bodyParserError.limit})`,
          );
        } else {
          result = new EntityTooLargeError(error.message);
        }
        break;

    }

    return result;
  }

  protected identifyHttpCode(error: Error): number {
    let code = HttpCode.InternalServer;
    if (error instanceof HttpError) {
      code = error.httpCode;
    } else if (error instanceof CoreHttpError) {
      code = error.code;
    } else if (undefined !== (error as any as BodyParserError).status) {
      code = (error as any as BodyParserError).status;
    }
    return code;
  }

  protected createValidationError(errors: ValidationError[], envelopeName: string) {
    return new ClassValidatorError(errors, envelopeName);
  }

}
