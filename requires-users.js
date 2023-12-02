import { randomUUID } from 'node:crypto'
import { sql } from './db.js';

export class RequiresUsers {
    async readById(id) {
        const res = await sql` select * from users where id = ${String(id)}`;

        return res;
    };

    async readAll() {
        const res = await sql` select * from users`;

        return res;
    };

    async readLogin(dto) {
        const { email, password } = dto;

        const res = await sql` select id, username, email, admin from users where email = ${email} and password = ${password}`;

        return res[0];
    };

    async create(dto) {
        const userId = randomUUID();
        const { username, datanascimento, email, password } = dto;

        await sql` insert into users (id, username, datanascimento, email, password) VALUES (${userId}, ${username}, ${datanascimento}, ${email}, ${password})`;
    };

    async update(dto) {
        const { id, username, datanascimento, email, password } = dto;

        await sql` update users set username = ${username}, datanascimento = ${datanascimento}, email = ${email}, password = ${password} where id = ${id}`;
    };

    async delete(id) {
        await sql` DELETE FROM users WHERE id = ${id};`
    };
}