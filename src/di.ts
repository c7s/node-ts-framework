import { Container, interfaces } from 'inversify';
import inversifyInjectDecorators from 'inversify-inject-decorators';
import { Type } from './Type';

export const container = new Container({ defaultScope: 'Singleton' });
export const inject: (
  serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
) => (proto: any, key: string) => void
  = inversifyInjectDecorators(container).lazyInject;
export { Type };
