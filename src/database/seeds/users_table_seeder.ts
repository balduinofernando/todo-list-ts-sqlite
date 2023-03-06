//import { Knex } from 'knex';
import { hash } from 'bcrypt';
import { ETableNames } from '../ETableNames';
import { database } from '../knex';

export async function seed(knex: any): Promise<void> {
    // Deletes ALL existing entries
    await database(ETableNames.people).del();

    // Inserts seed entries
    await database(ETableNames.users).insert([
        { id: 1, name: 'Balduino', email: 'balduino@sapo.ao', password: (await hash('fernando', 10)).toString() },
    ]);
}
