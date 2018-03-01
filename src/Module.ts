import { resolve } from 'path';
import { Container } from 'inversify';

export abstract class Module {

  public get controllers() {
    return resolve(this.baseDirectory, 'application/controllers/*.js');
  }

  public get migrations() {
    return resolve(this.baseDirectory, 'infrastructure/migrations/*.js');
  }

  public get models() {
    return resolve(this.baseDirectory, 'infrastructure/models/*.js');
  }

  public abstract async initDiContainer(
    container: Container,
    allApplicationModules: Module[],
  ): Promise<void>;
  public abstract async end(container: Container): Promise<void>;

  protected abstract get baseDirectory(): string;

}
