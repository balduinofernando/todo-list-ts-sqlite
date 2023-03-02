
//import { openDatabase } from '../config/database';

import { ETableNames } from '../database/ETableNames';
import { database } from '../database/knex';

export interface IPerson {
    id: number,
    name: string,
    age: number,
}

export class Person {

    async getAll() {
        return await database(ETableNames.people).select('*');
    }

    async getById(id: number) {
        return await database(ETableNames.people).where({ id });
    }

    /*async insertPerson(person: TPerson) {
        await openDatabase()
            .then((query) => {
                query.run('INSERT INTO pessoas (nome, idade) VALUES (?,?)', [person.name, person.age]);
            }).catch(error => {
                console.log(error);
            });
    }

    async updatePerson(id: number, person: TPerson) {
        await openDatabase()
            .then((query) => {
                query.run('UPDATE pessoas SET nome=?, idade=? WHERE id=? ', [person.name, person.age, id]);
            }).catch(error => {
                console.log(error);
            });
    }

    async deletePerson(id: number) {
        await openDatabase()
            .then((query) => {
                query.run('DELETE FROM pessoas WHERE id=? ', id);
            }).catch(error => {
                console.log(error);
            });
    } */
}