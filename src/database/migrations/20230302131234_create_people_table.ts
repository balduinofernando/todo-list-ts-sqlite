import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.people, table => {
        table.bigIncrements('id').primary().index();
        table.string('name', 100);
        table.integer('age', 3);
        table.timestamps();

        table.comment('Tabela usada para cadastrar pessoas');
    }).then(() => {
        // console.info(`# Migrated ${ETableNames.people} Table`);
    });
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable(ETableNames.people).then(() => {
        // console.info(`# Dropped ${ETableNames.users} Table`);
    });
}

