import { sql } from "./db.js";

sql`
ALTER TABLE users
ALTER COLUMN user_id TYPE TEXT
`.then(() => {
    console.log('TColuna adicionada!')
})