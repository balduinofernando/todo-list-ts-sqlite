import supertest from 'supertest';
import { app } from '../src/app';
import { database } from '../src/database/knex';
import path from 'path';

export const testServer = supertest(app);

beforeAll(async () => {
    await database.migrate.latest({ directory: path.resolve(__dirname, '../src/database/migrations/') });
    await database.seed.run({ directory: path.resolve(__dirname, '../src/database/seeds') });
});

afterAll(async () => {
    await database.destroy;
});