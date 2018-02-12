import * as express from 'express';
import { ServerConfig } from '@c7s/config';
import { inject, Type, container } from './di';
import { createExpressServer } from 'routing-controllers';
import { Module } from './Module';

export class Application {
  protected express: express.Application;
  protected modules: Module[];

  @inject(Type.ServerConfig)
  protected config!: ServerConfig;

  @inject(Type.MainLogger)
  protected logger!: Logger;

  constructor(
    modules: Module[],
    middlewares?: Function[] | string[],
  ) {
    this.modules = modules;
    const controllers = [].concat.apply([], modules.map(module => module.controllers));

    this.express = createExpressServer({
      controllers,
      middlewares,
      defaultErrorHandler: false,
    });
  }

  public async run() {
    await this.initDiContainer();

    const { host, port } = this.config;
    return new Promise((resolve, reject) => {
      this.express.listen({ host, port }, (err: any) => {
        if (err) {
          reject(err);
        }
        this.logger.info(`Server started at http://${host}:${port}`);
        resolve();
      });

    });
  }

  protected async initDiContainer() {
    return Promise.all(
      this.modules.map(module => module.initDiContainer(container)),
    );
  }

}
