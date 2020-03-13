import * as express from 'express';
import { useExpressServer } from 'routing-controllers';
import { ServerConfig } from '@c7s/config';
import { Server } from 'http';

import { Application } from './Application';
import { AccessLogMiddlewareFactory } from './middlewares/AccessLogMiddlewareFactory';
import { Module } from './Module';
import { inject, Type } from './di';

export class WebApplication extends Application {
  @inject(Type.ServerConfig)
  protected config!: ServerConfig;

  protected express: express.Application;
  protected middlewares: Function[] | string[];

  constructor(
    modules: Module[],
    middlewares: Function[] | string[],
  ) {
    super(modules);
    this.middlewares = middlewares;
    this.express = express();
  }

  public async run(): Promise<void> {
    try {
      await this.init();

      this.express.use((new AccessLogMiddlewareFactory).create());

      useExpressServer(
        this.express,
        {
          controllers: this.modules.map(module => module.controllers),
          middlewares: this.middlewares,
          defaultErrorHandler: false,
        },
      );

      const { host, port } = this.config;

      const server = await new Promise<Server>((resolve, reject) => {
        const server = this.express
          .listen(port, host, (err: any) => {
            if (err) {
              reject(err);
            }
            resolve(server);
          }).on('error', (err) => {
            reject(err);
          });
      });
      this.logger.info(`Server started at http://${host}:${port}`);

      process.on('SIGTERM', () => {
        this.logger.info('Got SIGTERM, stopping application');
        server.close(() => {
          this.end();
        });
      });
    } catch (e) {
      this.logger.error(e);
      await this.end();
      process.exit(1);
    }
  }

}
