import { randomUUID } from 'node:crypto'
import { sql } from './db.js';

export class RequiresForum {

    async create(dto) {
        const forumId = randomUUID();
        const { titulo, postagem, user_id } = dto;

        await sql` insert into topico_forum (id, titulo, postagem, user_id) VALUES (${forumId}, ${titulo}, ${postagem}, ${user_id})`;
    };

    async readById(id) {
        const res = await sql `select t.titulo, t.postagem, t.user_id, u.username from topico_forum t join users u on t.user_id = u.id where t.id = ${id}`;

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

        await sql` insert into resposta_forum (resposta, user_id, topic_id) VALUES (${resposta}, ${user_id}, ${topic_id})`;
    };

    async lerRespostas(id) {
        const res = await sql `select t.id, t.resposta, t.topic_id, t.user_id, u.username from resposta_forum t join users u on t.user_id = u.id where t.topic_id = ${id} order by t.id`;

        return res;
    };

    async deleteReply(id) {
        await sql `DELETE FROM resposta_forum WHERE id = ${id};`
    }

}