import { Connection } from 'typeorm';
import { DbConfig } from '@c7s/config';
import { Module } from '../Module';
/**
 * TODO timezone
 */
export declare class DbConnectionFactory {
    protected dbConfig: DbConfig;
    create(modules: Module[]): Promise<Connection>;
    getConfig(modules: Module[]): {
        migrations: string[];
        entities: string[];
        type: "postgres";
        host: string;
        database: string;
        username: string;
        password: string;
    };
}
