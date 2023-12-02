import { randomUUID } from 'node:crypto'
import { sql } from './db.js';

export class RequiresForum {

    async create(dto) {
        const forumId = randomUUID();
        const { titulo, postagem, user_id } = dto;

        await sql` insert into topico_forum (id, titulo, postagem, user_id) VALUES (${forumId}, ${titulo}, ${postagem}, ${user_id})`;
    };

    async readById(id) {
        const res = await sql` select * from topico_forum where id = ${String(id)}`;

        return res;
    };

    async lerForum() {
        const res = await sql `select * from topico_forum`;

        return res;
    }

    async update(dto) {
        const { id, titulo, postagem } = dto;

        await sql` update topico_forum set titulo = ${titulo}, postagem = ${postagem} where id = ${id}`;
    };

    async delete(id) {
        await sql` DELETE FROM topico_forum WHERE id = ${id};`
    };

    async reply(dto) {
        const { resposta, user_id, topic_id } = dto;
        const forumId = randomUUID();

        await sql` insert into resposta_forum (id, resposta, user_id, topic_id) VALUES (${forumId}, ${resposta}, ${user_id}, ${topic_id})`;
    };

    async lerRespostas(id) {
        const res = await sql` select * from resposta_forum where topic_id = ${id}`;

        return res;
    };

}