/// <reference types="express" />
import * as express from 'express';
import { ServerConfig } from '@c7s/config';
import { Application } from './Application';
import { Module } from './Module';
export declare class WebApplication extends Application {
    protected express: express.Application;
    protected config: ServerConfig;
    constructor(modules: Module[], middlewares?: Function[] | string[]);
    run(): Promise<void>;
}
