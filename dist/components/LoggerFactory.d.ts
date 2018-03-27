import * as log4js from 'log4js';
import { LogConfig, LogCategoryConfig } from '@c7s/config';
export declare class LoggerFactory {
    protected logConfig: LogConfig;
    constructor(log4jsConfig?: log4js.Configuration);
    create(category: string): log4js.Logger;
    protected static getAppenderFromConfig(categoryConfig: LogCategoryConfig): {
        type: string;
        filename: string;
        maxLogSize: number;
        backups: number;
        compress: boolean;
        daysToKeep?: undefined;
    } | {
        type: string;
        filename: string;
        daysToKeep: number;
        compress: boolean;
        maxLogSize?: undefined;
        backups?: undefined;
    } | {
        type: string;
        filename?: undefined;
        maxLogSize?: undefined;
        backups?: undefined;
        compress?: undefined;
        daysToKeep?: undefined;
    };
}
