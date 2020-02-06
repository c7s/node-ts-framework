import { Connection } from 'typeorm';
import { DbConfig } from '@c7s/config';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Module } from '../Module';
/**
 * TODO timezone
 */
export declare class DbConnectionFactory {
    protected dbConfig: DbConfig;
    create(modules: Module[]): Promise<Connection>;
    getConfig(modules: Module[], logging?: LoggerOptions): {
        logging: boolean | "all" | ("error" | "query" | "log" | "info" | "warn" | "schema" | "migration")[] | undefined;
        migrations: string[];
        entities: string[];
        type: "postgres";
        host: string;
        database: string;
        username: string;
        password: string;
    };
}
