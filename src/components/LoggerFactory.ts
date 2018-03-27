import * as log4js from 'log4js';
import { injectable } from 'inversify';
import { LogConfig, LogCategoryConfig } from '@c7s/config';
import { inject, Type } from '../di';

@injectable()
export class LoggerFactory {
  @inject(Type.LogConfig)
  protected logConfig!: LogConfig;

  protected isLoggerLibInitialized = false;

  public create(category: string) {
    if (!this.isLoggerLibInitialized) {
      this.initializeLoggerLib();
    }
    return log4js.getLogger(category);
  }

  protected initializeLoggerLib() {
    if (this.isLoggerLibInitialized) {
      return;
    }

    log4js.configure(this.getLoggerLibConfig());

    this.isLoggerLibInitialized = true;
  }

  protected getLoggerLibConfig() {
    return {
      appenders: {
        everything: this.getAppenderFromConfig(this.logConfig.main),
        access: this.getAppenderFromConfig(this.logConfig.access),
      },
      categories: {
        default: { appenders: ['everything'], level: this.logConfig.main.level },
        db: { appenders: ['everything'], level: this.logConfig.main.level },
        access: { appenders: ['access'], level: this.logConfig.access.level },
      },
    };
  }

  protected getAppenderFromConfig(categoryConfig: LogCategoryConfig) {
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
