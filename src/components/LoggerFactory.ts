import * as log4js from 'log4js';
import { injectable } from 'inversify';
import { LogConfig, LogCategoryConfig } from '@c7s/config';
import { inject, Type } from '../di';

@injectable()
export class LoggerFactory {
  @inject(Type.LogConfig)
  protected logConfig!: LogConfig;

  constructor() {
    log4js.configure({
      appenders: {
        everything: this.getAppenderFromConfig(this.logConfig.main),
        access: this.getAppenderFromConfig(this.logConfig.access),
      },
      categories: {
        default: { appenders: ['everything'], level: this.logConfig.main.level },
        db: { appenders: ['everything'], level: this.logConfig.main.level },
        access: { appenders: ['access'], level: this.logConfig.access.level },
      },
    });
  }

  public create(category: string) {
    return log4js.getLogger(category);
  }

  protected getAppenderFromConfig(categoryConfig: LogCategoryConfig) {
    return {
      file: {
        type: 'dateFile',
        filename: categoryConfig.filename,
        daysToKeep: 10,
      },
      console: {
        type: 'console',
      },
    }[categoryConfig.type];
  }

}
