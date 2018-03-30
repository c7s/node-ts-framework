import { Request, Response } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { BadRequestError } from '@c7s/http-errors';

@Middleware({ type: 'before' })
export class RejectNanParamsMiddleware implements ExpressMiddlewareInterface {

  public use(request: Request, {}: Response, next: (err?: any) => any): void {
    for (const param in Object.keys(request.params)) {
      if ('number' === typeof request.params[param] && isNaN(request.params[param])) {
        throw new BadRequestError(`Route parameter ${param} must be a number`);
      }
    }
    next();
  }

}
