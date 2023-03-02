//import { openDatabase } from '../config/database';

export interface IUser {
    name: string,
    email: string,
    password: string,
    created_at?: string,
    updated_at?: string
}

/* 
export default class User {
    constructor() {
        openDatabase();
        this.createUserTable();
    }

    async createUserTable() {
        const sqlQuery = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, created_at TEXT NULL, updated_at TEXT NULL)';

        await openDatabase().then(query => {
            query.exec(sqlQuery);
        });
    }

    async getAll() {
        return await openDatabase().then(query => {
            return query.all('SELECT * FROM users')
                .then(res => res);
        });
    }

    async getUser(id: number) {
        return await openDatabase().then(query => {
            return query.get('SELECT * FROM users WHERE id = ?', [id]).then(result => result);
        });
    }

    async getByEmail(email: string) {
        return await openDatabase().then(query => {
            return query.get('SELECT * FROM users WHERE email = ?', [email]).then(result => result);
        });
    }

    async save(user: TUser) {
        await openDatabase().then(query => {
            const encriptedPassword = user.password;
            query.run('INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?,?,?,?,?)', [
                user.name, user.email, encriptedPassword, new Date(), new Date()]);
        });
    }

    async update(id: number, user: TUser) {
        await openDatabase().then(query => {
            query.run('UPDATE users SET name=?, email=?, password=?, updated_at=? WHERE id=?', [
                user.name, user.email, user.password, new Date(), id
            ]);
        });
    }

    async delete(id: number) {
        await openDatabase().then(query => {
            query.run('DELETE FROM users WHERE id=?', [id]);
        });
    }

} */