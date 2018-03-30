/// <reference types="express" />
import { Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
export declare class RejectNanParamsMiddleware implements ExpressMiddlewareInterface {
    use(request: Request, {}: Response, next: (err?: any) => any): void;
}
