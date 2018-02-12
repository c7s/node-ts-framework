import * as morgan from 'morgan';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { ExpressLogger } from '../logging';
import { getStream } from '../logging/getStream';

@Middleware({ type: 'before' })
export class WarnLoggingMiddleware implements ExpressMiddlewareInterface {
    public use = morgan('dev', {
        skip: (_req, res) => res.statusCode < 400,
        stream: getStream(ExpressLogger.warn.bind(ExpressLogger))
    });
}
