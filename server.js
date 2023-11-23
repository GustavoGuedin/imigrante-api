import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { RequiresUsers } from "./requires-users.js";

const server = fastify();

server.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
});

const database = new RequiresUsers;

server.post('/signin/create', async (resquest, reply) => {
    const { username, datanascimento, email, password } = resquest.body;

    await database.create({
        username,
        datanascimento,
        email,
        password
    });

    return reply.status(201).send();
});

server.listen({
    port: 3333
});