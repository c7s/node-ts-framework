import * as log4js from 'log4js';
import { LogConfig, LogCategoryConfig } from '@c7s/config';
export declare class LoggerFactory {
    protected logConfig: LogConfig;
    constructor();
    create(category: string): log4js.Logger;
    protected getAppenderFromConfig(categoryConfig: LogCategoryConfig): {
        type: string;
        filename: string;
        daysToKeep: number;
    } | {
        type: string;
        filename?: undefined;
        daysToKeep?: undefined;
    };
}
