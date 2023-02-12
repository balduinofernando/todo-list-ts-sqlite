import sqlite3 from "sqlite3";
import { open } from 'sqlite';

export async function openDatabase() {

    return open({
        filename: "./src/database/banco.sqlite",
        driver: sqlite3.Database
    });

}