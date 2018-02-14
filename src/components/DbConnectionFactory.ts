import { injectable } from 'inversify';
import { createConnection, Connection } from 'typeorm';
import { DbConfig } from '@c7s/config';
import { inject, Type } from '../di';
import { Module } from '../Module';
import { TypeormLogger } from '../log/TypeormLogger';

/**
 * TODO timezone
 */
@injectable()
export class DbConnectionFactory {
  @inject(Type.DbConfig)
  protected dbConfig!: DbConfig;

  public async create(modules: Module[]): Promise<Connection> {
    return createConnection({
      ...this.dbConfig,
      logging: this.dbConfig.logging as any,
      logger: new TypeormLogger,
      migrations: modules.map(module => module.migrations),
      entities: modules.map(module => module.models),
    });
  }

}
