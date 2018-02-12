import { Request, Response, NextFunction } from 'express';
import { Middleware, HttpError } from 'routing-controllers';
import { HttpError as CoreHttpError } from '@http-error';
import { NotFoundError } from '@http-error';
import { InternalServerError } from '@http-error';
import { CvValidationError } from '@http-error';
import { BadRequestError } from '@http-error';
import { MainLogger } from '../logging';

const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_CODE = 500;

@Middleware({ type: 'after' })
export class ErrorHandlingMiddleware implements ErrorHandlingMiddleware {
    public error(error: Error, _request: Request, response: Response, next: NextFunction) {
        const extractedError = this.extractError(error);
        this.logError(extractedError);

        const coreHttpError = (extractedError instanceof CoreHttpError)
            ? extractedError
            : this.tryCreateCoreHttpError(extractedError);

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
        (code == INTERNAL_SERVER_CODE)
            ? MainLogger.critical(error)
            : MainLogger.error(error);
    }

    protected tryCreateCoreHttpError(error: Error): CoreHttpError | null {
        let result = null;
        const code = this.identifyHttpCode(error);

        switch (code) {
            case BAD_REQUEST_CODE:
                const errors = (<any>error).errors;
                result = errors
                    ? new CvValidationError(errors)
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
}
