import { randomUUID } from 'node:crypto'
import { sql } from './db.js';

export class RequiresLocations {
    async readById(id) {
        const res = await sql` select * from locations where id = ${String(id)}`;

        return res;
    };

    async readAll() {
        const res = await sql` select * from locations`;

        return res;
    };

    async create(dto) {
        const locationsId = randomUUID();
        const { link, local } = dto;

        await sql` insert into locations (id, link, local) VALUES (${locationsId}, ${link}, ${local})`;
    };

    async update(dto) {
        const { id, link, local } = dto;

        await sql` update locations set link = ${link}, local = ${local} where id = ${id}`;
    };

    async delete(id) {
        await sql` DELETE FROM locations WHERE id = ${id};`
    };
}