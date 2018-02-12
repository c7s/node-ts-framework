import { Container } from 'inversify';
import { makeProvideDecorator } from 'inversify-binding-decorators';
import inversifyInjectDecorators from 'inversify-inject-decorators';
import { Type } from './Type';

export const container = new Container({ defaultScope: 'Singleton' });
export const provide = makeProvideDecorator(container);
export const inject = inversifyInjectDecorators(container).lazyInject;
export { Type };
