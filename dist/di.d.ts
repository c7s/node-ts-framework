import { Container, interfaces } from 'inversify';
import { Type } from './Type';
export declare const container: Container;
export declare const inject: (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>) => (proto: any, key: string) => void;
export { Type };
