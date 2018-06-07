import * as di from './di';
import { Application } from './Application';
import { WebApplication } from './WebApplication';
import { ClusteredWebApplication } from './ClusteredWebApplication';
import { Module } from './Module';
import { Environment } from './Environment';
import { DatabaseErrors } from './DatabaseErrors';
import { DbConnectionFactory } from './components/DbConnectionFactory';
import { LoggerFactory } from './components/LoggerFactory';
import { AccessLogMiddlewareFactory } from './middlewares/AccessLogMiddlewareFactory';
import { ErrorHandlingMiddleware } from './middlewares/ErrorHandlingMiddleware';
import { rejectNanParam } from './utils/rejectNanParam';
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
};
export const components = {
  DbConnectionFactory,
  LoggerFactory,
};
export const middlewares = {
  AccessLogMiddlewareFactory,
  ErrorHandlingMiddleware,
};
export const utils = {
  rejectNanParam,
};
export const validation = {
  Trim,
  StripTags,
};
