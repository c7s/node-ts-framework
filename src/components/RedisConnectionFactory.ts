import { injectable } from 'inversify';
import * as IORedis from 'ioredis';
import { RedisConfig } from '@c7s/config';
import { inject, Type } from '../di';

@injectable()
export class RedisConnectionFactory {
  @inject(Type.RedisConfig)
  protected config!: RedisConfig;

  public async create() {
    const connection = new IORedis(this.config);
    await new Promise((resolve, reject) => {
      connection.on('connect', () => {
        resolve();
      });
      connection.on('error', (err) => {
        connection.quit();
        reject(err);
      });
    });
    return connection;
  }

}
