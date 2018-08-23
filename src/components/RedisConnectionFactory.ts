import { injectable } from 'inversify';
import * as IORedis from 'ioredis';
import { RedisConfig } from '@c7s/config';
import { inject, Type } from '../di';

@injectable()
export class RedisConnectionFactory {
  @inject(Type.RedisConfig)
  protected config!: RedisConfig;

  public create() {
    return new IORedis(this.config);
  }

}
