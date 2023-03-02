import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ETableNames.users, table => {
            table.bigIncrements('id').primary().index();
            table.string('name', 100).notNullable();
            table.string('email', 100).notNullable().index();
            table.string('password', 255).notNullable();

            table.comment('Tabela para os usuários do sistema');
        })
        .then(() => {
            console.log(`# Migrated ${ETableNames.users} Table`);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable(ETableNames.users)
        .then(() => {
            console.log(`#Ddropped ${ETableNames.users} Table`);
        });
}

