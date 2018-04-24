import * as di from './di';
import { Application } from './Application';
import { WebApplication } from './WebApplication';
import { ClusteredWebApplication } from './ClusteredWebApplication';
import { Module } from './Module';
import { Environment } from './Environment';
import { DbConnectionFactory } from './components/DbConnectionFactory';
import { LoggerFactory } from './components/LoggerFactory';
import { AccessLogMiddlewareFactory } from './middlewares/AccessLogMiddlewareFactory';
import { ErrorHandlingMiddleware } from './middlewares/ErrorHandlingMiddleware';
import { rejectNanParam } from './rejectNanParam';

export {
  Application,
  WebApplication,
  ClusteredWebApplication,
  Module,
  di,
  Environment,
  rejectNanParam,
};
export const components = {
  DbConnectionFactory,
  LoggerFactory,
};
export const middlewares = {
  AccessLogMiddlewareFactory,
  ErrorHandlingMiddleware,
};
