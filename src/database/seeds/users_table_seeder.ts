//import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';
import { database } from '../knex';

export async function seed(knex: any): Promise<void> {
    // Deletes ALL existing entries
    await database(ETableNames.people).del();

    // Inserts seed entries
    await database(ETableNames.people).insert([
        { id: 1, name: 'André', age: 17 },
        { id: 1, name: 'Marcos', age: 40 },
        { id: 1, name: 'Soraia', age: 25 },
    ]);
}
