import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
    client: 'better-sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', 'banco.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
        extension: 'ts'
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
        extension: 'ts',
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.pragma('foreign_keys = ON');
            done();
        }
    }
};

export const test: Knex.Config = {
    ...development,
    connection: ':memory:'
};

export const production: Knex.Config = {
    ...development
};
