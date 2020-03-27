import { Logger } from 'log4js';
import { inject, Type, container } from './di';
import { Module } from './Module';

export class Application {
  protected modules: Module[];

  @inject(Type.AppLogger)
  protected logger!: Logger;

  protected isInitialized: boolean = false;

  constructor(modules: Module[]) {
    this.modules = modules;
  }

  public async init() {
    if (this.isInitialized) {
      return;
    }

    for (const module of this.modules) {
      await module.initDiContainer(container, this.modules);
    }

    this.isInitialized = true;
  }

  public async end() {
    if (!this.isInitialized) {
      return;
    }

    await Promise.all(
      this.modules.map(module => module.end(container)),
    );
  }

  public async run(callback: Function) {
    try {
      await this.init();
      const result = callback();
      if (result instanceof Promise) {
        await result;
      }
      await this.end();
    } catch (e) {
      if (!this.isInitialized) {
        console.error(e);
      } else {
        this.logger.error(e);
      }
      await this.end();
      process.exit(1);
    }
  }

}
