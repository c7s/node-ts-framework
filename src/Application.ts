import { Logger } from 'log4js';
import { inject, Type, container } from './di';
import { Module } from './Module';

export class Application {
  protected modules: Module[];

  @inject(Type.AppLogger)
  protected logger!: Logger;

  constructor(
    modules: Module[],
  ) {
    this.modules = modules;
  }

  public async init() {
    return Promise.all(
      this.modules.map(module => module.initDiContainer(container)),
    );
  }

}
