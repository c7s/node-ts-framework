import { Logger } from 'typeorm';
import { Logger as Log4jsLogger } from 'log4js';
/**
 * Message formatting code copy-pasted from typeorm/src/logger/FileLogger
 */
export declare class TypeormLogger implements Logger {
    protected logger: Log4jsLogger;
    logQuery(query: string, parameters: any[] | undefined): void;
    logQueryError(error: string, query: string, parameters: any[] | undefined): void;
    logQuerySlow(time: number, query: string, parameters?: any[] | undefined): void;
    logSchemaBuild(message: string): void;
    logMigration(message: string): void;
    log(level: 'log' | 'info' | 'warn', message: any): void;
}
