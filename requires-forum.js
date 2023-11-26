import { sql } from './db.js';

export class RequiresForum {

    async lerForum() {
        const res = await sql `select * from topico_forum`;

        return res;
    }

}