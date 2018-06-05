import * as express from 'express';
import { ServerConfig } from '@c7s/config';
import { Application } from './Application';
import { Module } from './Module';
export declare class WebApplication extends Application {
    protected config: ServerConfig;
    protected express: express.Application;
    protected middlewares: Function[] | string[];
    constructor(modules: Module[], middlewares: Function[] | string[]);
    run(): Promise<void>;
}
