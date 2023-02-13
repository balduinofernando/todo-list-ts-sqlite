
import { openDatabase } from "../config/database";

type TPerson = {
    name: string,
    age: number,
};

export class Person {


    async createTablePerson() {
        await openDatabase().then(query => {
            query.exec("CREATE TABLE IF NOT EXISTS pessoas(id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER)");
        });
    };

    async listPeople() {
        return openDatabase().then(query => {
            return query.all("SELECT * FROM pessoas")
                .then(res => res);
        });
    };

    async getPerson(id: number) {
        return openDatabase().then(query => {
            return query.get("SELECT * FROM pessoas WHERE id=?", [id])
                .then(res => res);
        });
    };

    async insertPerson(person: TPerson) {
        await openDatabase()
            .then((query) => {
                query.run("INSERT INTO pessoas (nome, idade) VALUES (?,?)", [person.name, person.age]);
            }).catch(error => {
                console.log(error);
            });
    };

    async updatePerson(id: number, person: TPerson) {
        await openDatabase()
            .then((query) => {
                query.run("UPDATE pessoas SET nome=?, idade=? WHERE id=? ", [person.name, person.age, id]);
            }).catch(error => {
                console.log(error);
            });
    };

    async deletePerson(id: number) {
        await openDatabase()
            .then((query) => {
                query.run("DELETE FROM pessoas WHERE id=? ", id);
            }).catch(error => {
                console.log(error);
            });
    };
}