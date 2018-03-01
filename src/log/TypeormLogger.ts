import { Logger } from 'typeorm';
import { Logger as Log4jsLogger } from 'log4js';
import { inject, Type } from '../di';

/**
 * Message formatting code copy-pasted from typeorm/src/logger/FileLogger
 */
export class TypeormLogger implements Logger {
  @inject(Type.AppLogger)
  protected logger!: Log4jsLogger;

  public logQuery(query: string, parameters: any[] | undefined) {
    const sql = query
      + (parameters && parameters.length ? ' -- PARAMETERS: ' + JSON.stringify(parameters) : '');
    this.logger.info('[QUERY]: ' + sql);
  }

  public logQueryError(error: string, query: string, parameters: any[] | undefined) {
    const sql = query
      + (parameters && parameters.length ? ' -- PARAMETERS: ' + JSON.stringify(parameters) : '');
    this.logger.error(`[FAILED QUERY]: ${sql}`);
    this.logger.error(`[QUERY ERROR]: ${error}`);
  }

  public logQuerySlow(time: number, query: string, parameters?: any[] | undefined) {
    const sql = query
      + (parameters && parameters.length ? ' -- PARAMETERS: ' + JSON.stringify(parameters) : '');
    this.logger.warn(`[SLOW QUERY: ${time} ms]: ` + sql);
  }

  public logSchemaBuild(message: string) {
    this.logger.info(message);
  }

  public logMigration(message: string) {
    this.logger.info(message);
  }

  public log(level: 'log' | 'info' | 'warn', message: any) {
    this.logger.log(level, message);
  }

}
