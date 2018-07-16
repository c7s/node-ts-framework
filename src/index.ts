import * as di from './di';
import { Application } from './Application';
import { WebApplication } from './WebApplication';
import { ClusteredWebApplication } from './ClusteredWebApplication';
import { Module } from './Module';
import { Environment } from './Environment';
import { DatabaseErrors } from './DatabaseErrors';
import { DbConnectionFactory } from './components/DbConnectionFactory';
import { RedisConnectionFactory } from './components/RedisConnectionFactory';
import { LoggerFactory } from './components/LoggerFactory';
import { AccessLogMiddlewareFactory } from './middlewares/AccessLogMiddlewareFactory';
import { ErrorHandlingMiddleware } from './middlewares/ErrorHandlingMiddleware';
import { rejectNanParam } from './controller/rejectNanParam';
import { ByAttribute } from './pagination/ByAttribute';
import { ByOffset } from './pagination/ByOffset';
import { ReturnSpecification } from './controller/ReturnSpecification';
import { Trim } from './validation/Trim';
import { StripTags } from './validation/StripTags';

export {
  Application,
  WebApplication,
  ClusteredWebApplication,
  Module,
  DatabaseErrors,
  di,
  Environment,
  rejectNanParam,
  ReturnSpecification,
};
export const components = {
  DbConnectionFactory,
  RedisConnectionFactory,
  LoggerFactory,
};
export const middlewares = {
  AccessLogMiddlewareFactory,
  ErrorHandlingMiddleware,
};
export const controller = {
  rejectNanParam,
  ReturnSpecification,
};
export const pagination = {
  ByAttribute,
  ByOffset,
};
export const validation = {
  Trim,
  StripTags,
};
