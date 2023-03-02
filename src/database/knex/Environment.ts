import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
    client: 'better-sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: `${process.env.SQLITE_FILE_NAME}` || path.resolve(__dirname, '..', 'banco.sqlite'),
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
        // eslint-disable-next-line @typescript-eslint/ban-types
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
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