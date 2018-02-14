import { Container, interfaces } from 'inversify';
import { makeProvideDecorator } from 'inversify-binding-decorators';
import inversifyInjectDecorators from 'inversify-inject-decorators';
import { Type } from './Type';

export const container = new Container({ defaultScope: 'Singleton' });
export const provide: (
  serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
  force?: boolean | undefined,
) => (target: any) => any
  = makeProvideDecorator(container);
export const inject: (
  serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
) => (proto: any, key: string) => void
  = inversifyInjectDecorators(container).lazyInject;
export { Type };
