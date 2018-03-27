import * as log4js from 'log4js';
import { LogConfig, LogCategoryConfig } from '@c7s/config';
export declare class LoggerFactory {
    protected logConfig: LogConfig;
    protected isLoggerLibInitialized: boolean;
    create(category: string): log4js.Logger;
    protected initializeLoggerLib(): void;
    protected getLoggerLibConfig(): {
        appenders: {
            everything: {
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
            access: {
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
        };
        categories: {
            default: {
                appenders: string[];
                level: string;
            };
            db: {
                appenders: string[];
                level: string;
            };
            access: {
                appenders: string[];
                level: string;
            };
        };
    };
    protected getAppenderFromConfig(categoryConfig: LogCategoryConfig): {
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
