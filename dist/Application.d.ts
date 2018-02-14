import { Logger } from 'log4js';
import { Module } from './Module';
export declare class Application {
    protected modules: Module[];
    protected logger: Logger;
    constructor(modules: Module[]);
    init(): Promise<void[]>;
}
