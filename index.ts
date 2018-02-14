import * as di from './src/di';
import { Application } from './src/Application';
import { WebApplication } from './src/WebApplication';
import { ClusteredWebApplication } from './src/ClusteredWebApplication';
import { Module } from './src/Module';
import { Environment } from './src/Environment';
import { DbConnectionFactory } from './src/components/DbConnectionFactory';
import { LoggerFactory } from './src/components/LoggerFactory';
import { AccessLogMiddlewareFactory } from './src/middlewares/AccessLogMiddlewareFactory';
import { ErrorHandlingMiddleware } from './src/middlewares/ErrorHandlingMiddleware';

export {
  Application,
  WebApplication,
  ClusteredWebApplication,
  Module,
  di,
  Environment,
};
export const components = {
  DbConnectionFactory,
  LoggerFactory,
};
export const middlewares = {
  AccessLogMiddlewareFactory,
  ErrorHandlingMiddleware,
};
