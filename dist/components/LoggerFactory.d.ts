import * as log4js from 'log4js';
import { LogConfig, LogCategoryConfig } from '@c7s/config';
export declare class LoggerFactory {
    protected readonly logConfig: LogConfig;
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
            } | {
                type: string;
                filename: string;
                daysToKeep: number;
                compress: boolean;
            } | {
                type: string;
            };
            access: {
                type: string;
                filename: string;
                maxLogSize: number;
                backups: number;
                compress: boolean;
            } | {
                type: string;
                filename: string;
                daysToKeep: number;
                compress: boolean;
            } | {
                type: string;
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
    } | {
        type: string;
        filename: string;
        daysToKeep: number;
        compress: boolean;
    } | {
        type: string;
    };
}
