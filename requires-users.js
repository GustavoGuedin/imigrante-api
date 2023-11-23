import { randomUUID } from 'node:crypto'
import { sql } from './db.js';

export class RequiresUsers {
    list(filters) {
        
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
}