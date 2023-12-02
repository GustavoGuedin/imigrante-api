import { randomUUID } from 'node:crypto'
import { sql } from './db.js';

export class RequiresFaq {
    async readById(id) {
        const res = await sql` select * from faq where id = ${String(id)}`;

        return res;
    };

    async readAll() {
        const res = await sql` select * from faq ORDER BY pergunta`;

        return res;
    };

    async create(dto) {
        const faqId = randomUUID();
        const { pergunta, resposta } = dto;

        await sql` insert into faq (id, pergunta, resposta) VALUES (${faqId}, ${pergunta}, ${resposta})`;
    };

    async update(dto) {
        const { id, pergunta, resposta } = dto;

        await sql` update faq set pergunta = ${pergunta}, resposta = ${resposta} where id = ${id}`;
    };

    async delete(id) {
        await sql` DELETE FROM faq WHERE id = ${id};`
    };
}