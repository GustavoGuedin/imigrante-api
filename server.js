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

server.post('/login/acesso', async (request, reply) => {
    const { email, password } = request.body;

    const respSql = await database.readLogin({
        email,
        password
    });

    if (respSql > 0) {
        reply.status(200).send({ success: true, message: 'Login bem-sucedido!' });
    } else {
        reply.status(401).send({ success: false, message: 'Credenciais inválidas.' });
    }
});

server.get('/users/recoverAll', async (request, reply) => {
    const respSql = await database.readAll();

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Nenhum usuário cadastrado!' });
    }
});

server.get('/forum/lerForum', async (request, reply) => {
    const respSql = await database.lerForum();

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Não há tópicos' });
    }
});

server.listen({
    port: 3333
});