import { ETableNames } from '../database/ETableNames';
import { database } from '../database/knex';

export interface ITodo {
    id: number,
    user_id: number,
    task_name: string,
    status: string | ETodoStatus,
}

export enum ETodoStatus {
    inProgress = 'In Progress',
    completed = 'Completed',
    declined = 'Declined'
}

export class Todo {
    async get() {
        return await database(ETableNames.todos).select('*');
    }

    async getById(id: number) {
        return await database(ETableNames.todos).where({ id }).first();
    }

    async insert({ user_id, task_name, status }: Omit<ITodo, 'id'>) {
        await database(ETableNames.todos).insert({ user_id, task_name, status });
    }

    async update(id: number, { user_id, task_name, status }: Omit<ITodo, 'id'>) {
        await database(ETableNames.todos).update({ user_id, task_name, status, updated_at: new Date }).where({ id });
    }

    async delete(id: number) {
        await database(ETableNames.todos).where({ id }).delete();
    }

}