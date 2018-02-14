import { Connection } from 'typeorm';
import { DbConfig } from '@c7s/config';
import { Module } from '../Module';
import { TypeormLogger } from '../log/TypeormLogger';
/**
 * TODO timezone
 */
export declare class DbConnectionFactory {
    protected dbConfig: DbConfig;
    create(modules: Module[]): Promise<Connection>;
    getConfig(modules: Module[]): {
        logging: any;
        logger: TypeormLogger;
        migrations: string[];
        entities: string[];
        type: "postgres";
        host: string;
        database: string;
        username: string;
        password: string;
    };
}
