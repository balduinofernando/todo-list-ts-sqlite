import { ETableNames } from '../database/ETableNames';
import { database } from '../database/knex';

export interface IUser {
    name: string,
    email: string,
    password: string,
    newPassword?: string,
    created_at?: string | Date,
    updated_at?: string | Date
}

export default class User {

    async all() {
        return await database(ETableNames.users).select('*');
    }

    async getById(id: number) {
        return await database(ETableNames.users).where({ id }).first();
    }

    async getByEmail(email: string) {
        return await database(ETableNames.users).where({ email }).first();
    }

    async save({ name, email, password, }: IUser) {
        await database(ETableNames.users).insert({ name, email, password, created_at: new Date(), updated_at: new Date() });
    }

    async update(id: number, { name, email, newPassword, }: IUser) {
        if (newPassword) {
            await database(ETableNames.users).update({ password: newPassword, updated_at: new Date() }).where({ id });
        }

        await database(ETableNames.users).update({ name, email, updated_at: new Date() }).where({ id });
    }

    async delete(id: number) {
        await database(ETableNames.users).delete().where({ id });
    }

} 