import { injectable } from 'inversify';
import { createConnection } from 'typeorm';
import { DbConfig } from '@c7s/config';
import { inject, Type } from '../di';
import { Module } from '../Module';
import { TypeormLogger } from '../log/TypeormLogger';

/**
 * TODO custom logger, timezone
 */
@injectable()
export class DbConnectionFactory {
  @inject(Type.DbConfig)
  protected dbConfig!: DbConfig;

  public create(modules: Module[]) {
    return createConnection({
      ...this.dbConfig,
      logging: this.dbConfig.logging as any,
      logger: new TypeormLogger,
      migrations: modules.map(module => module.migrations),
      entities: modules.map(module => module.models),
    });
  }

}
