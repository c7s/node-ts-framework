import { Logger, connectLogger } from 'log4js';
import { inject, Type } from '../di';

export class AccessLogMiddlewareFactory {
  @inject(Type.AccessLogger)
  protected logger!: Logger;

  public create() {
    return connectLogger(this.logger, {
      level: 'auto',
      /* tslint:disable:max-line-length */
      format: ':remote-addr - - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent" :response-time',
      /* tslint:enable:max-line-length */
    });
  }

}
