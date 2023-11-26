import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class RequiresUsers {
    async readAll() {
        const res = await sql` select * from users`;

        return res;
    };

    async readLogin(dto) {
        const { email, password } = dto;

        const res = await sql` select COUNT(*) as total from users where email = ${email} and password = ${password}`;

        return res[0].total;
    };

    async create(dto) {
        const userId = randomUUID();
        const { username, datanascimento, email, password } = dto;

        await sql` insert into users (user_id, username, datanascimento, email, password) VALUES (${userId}, ${username}, ${datanascimento}, ${email}, ${password})`;
    };

    update(id, dto) {

    };

    delete(id) {

    };

    async lerForum() {
        const res = await sql `select * from topico_forum`;

        return res;
    }
}
