import { ETableNames } from '../database/ETableNames';
import { database } from '../database/knex';

export interface IPerson {
    id: number,
    name: string,
    age: number,
}

export class Person {

    async get() {
        return await database(ETableNames.people).select('*');
    }

    async getById(id: number) {
        return await database(ETableNames.people).where({ id });
    }

    async insert({ name, age }: Omit<IPerson, 'id'>) {
        await database(ETableNames.people).insert({ name, age });
    }

    async update(id: number, { name, age }: Omit<IPerson, 'id'>) {
        await database(ETableNames.people).update({
            name, age
        }).where({ id });
    }

    async delete(id: number) {
        await database(ETableNames.people).where({ id }).delete();
    }
}