import * as express from 'express';
import { createExpressServer } from 'routing-controllers';
import { ServerConfig } from '@c7s/config';
import { Application } from './Application';
import { AccessLogMiddlewareFactory } from './middlewares/AccessLogMiddlewareFactory';
import { Module } from './Module';
import { inject, Type } from './di';

export class WebApplication extends Application {
  protected express: express.Application;

  @inject(Type.ServerConfig)
  protected config!: ServerConfig;

  constructor(
    modules: Module[],
    middlewares?: Function[] | string[],
  ) {
    super(modules);
    const controllers = modules.map(module => module.controllers);

    this.express = createExpressServer({
      controllers,
      middlewares,
      defaultErrorHandler: false,
    });
  }

  public async run(): Promise<void> {
    await this.init();

    this.express.use((new AccessLogMiddlewareFactory).create());

    const { host, port } = this.config;
    return new Promise<void>((resolve, reject) => {
      this.express.listen({ host, port }, (err: any) => {
        if (err) {
          reject(err);
        }
        this.logger.info(`Server started at http://${host}:${port}`);
        resolve();
      });

    });
  }

}
