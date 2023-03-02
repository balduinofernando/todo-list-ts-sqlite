import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable(ETableNames.todos, table => {
        table.bigIncrements('id', { primaryKey: true }).index();
        table.bigInteger('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.string('task_name').notNullable();
        table.enum('status', ['In Progress', 'Completed', 'Declined']);

        table.comment('Tabela para armazenar tarefas');
    }).then(() => {
        console.log(`# Migrated ${ETableNames.todos} Table`);
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable(ETableNames.todos).then(() => {
        console.log(`# Dropped ${ETableNames.todos} Table`);
    });
}

