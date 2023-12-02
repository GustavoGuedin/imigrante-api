import { sql } from './db.js';

export class RequiresForum {

    async lerPorId(id) {
        const res = await sql` select * from topico_forum where id = ${String(id)}`;

        return res;
    };

    async lerForum() {
        const res = await sql `select * from topico_forum`;

        return res;
    }

}