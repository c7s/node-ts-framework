import * as log4js from 'log4js';
import { injectable } from 'inversify';
import * as deepExtend from 'deep-extend';
import { LogConfig, LogCategoryConfig } from '@c7s/config';
import { inject, Type } from '../di';

@injectable()
export class LoggerFactory {
  @inject(Type.LogConfig)
  protected logConfig!: LogConfig;

  constructor(log4jsConfig?: log4js.Configuration) {
    log4js.configure(deepExtend(
      {
        appenders: {
          everything: LoggerFactory.getAppenderFromConfig(this.logConfig.main),
          access: LoggerFactory.getAppenderFromConfig(this.logConfig.access),
        },
        categories: {
          default: { appenders: ['everything'], level: this.logConfig.main.level },
          db: { appenders: ['everything'], level: this.logConfig.main.level },
          access: { appenders: ['access'], level: this.logConfig.access.level },
        },
      },
      log4jsConfig,
    ));
  }

  public create(category: string) {
    return log4js.getLogger(category);
  }

  protected static getAppenderFromConfig(categoryConfig: LogCategoryConfig) {
    return {
      file: {
        type: 'file',
        filename: categoryConfig.filename,
        maxLogSize: 50 * 1024 * 1024,
        backups: 10,
        compress: true,
      },
      dateFile: {
        type: 'dateFile',
        filename: categoryConfig.filename,
        daysToKeep: 10,
        compress: true,
      },
      console: {
        type: 'console',
      },
    }[categoryConfig.type];
  }

}
