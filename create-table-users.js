import { sql } from "./db.js";

sql`
    ALTER TABLE users
    ADD id TEXT PRIMARY KEY
`.then(() => {
    console.log('TColuna adicionada!')
})