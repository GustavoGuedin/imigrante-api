import { randomUUID } from 'node:crypto'
import { sql } from './db.js';

export class RequireInterprete {
    async readById(id) {
        const res = await sql` select * from interprete where id = ${id}`;

        return res;
    };

    async create(dto) {
        const userId = randomUUID();
        const { username, telefone, email, endereco, idioma } = dto;

        await sql` insert into interprete (id, username, telefone, email, endereco, idioma) VALUES (${userId}, ${username}, ${telefone}, ${email}, ${endereco}, ${idioma})`;
    };

    async readAll() {
        const res = await sql` select * from interprete`;

        return res;
    };

    async delete(id) {
        await sql` DELETE FROM interprete WHERE id = ${id};`
    };

    async update(dto) {
    const { id, username, telefone, email, endereco, idioma } = dto;

    await sql` update interprete set username = ${username}, telefone = ${telefone}, email = ${email}, endereco = ${endereco}, idioma = ${idioma} where id = ${id}`;
    };
}