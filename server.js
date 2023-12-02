import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { RequiresUsers } from "./requires-users.js";
import { RequiresLocations } from "./require-locations.js";
import { RequiresFaq } from "./require-faq.js";
import { RequiresForum } from "./requires-forum.js";

const server = fastify();

server.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
});

const dbUser = new RequiresUsers;
const dbLocation = new RequiresLocations;
const dbFaq = new RequiresFaq;
const dbForum = new RequiresForum;

/* ######### INÍCIO - CHAMADAS PARA A ENTIDADE USER ################### */
server.post('/signin/create', async (resquest, reply) => {
    const { username, datanascimento, email, password } = resquest.body;

    await dbUser.create({
        username,
        datanascimento,
        email,
        password
    });

    return reply.status(201).send();
});

server.post('/login/acesso', async (request, reply) => {
    const { email, password } = request.body;

    const respSql = await dbUser.readLogin({
        email,
        password
    });

    if (respSql) {
        reply.status(200).send({ success: true, message: 'Login bem-sucedido!', content: respSql  });
    } else {
        reply.status(401).send({ success: false, message: 'Credenciais inválidas.' });
    }
});

server.get('/users/recoverAll', async (request, reply) => {
    const respSql = await dbUser.readAll();

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Nenhum usuário cadastrado!' });
    }
});

server.get('/users/readById/:id', async (request, reply) => {
    const userId = request.params.id;
    const respSql = await dbUser.readById(userId);

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Usuário não cadastrado!' });
    }
});

server.put('/user/edit', async (request, reply) => {
    try {
        const { id, username, datanascimento, email, password } = request.body;

        await dbUser.update({
            id, 
            username, 
            datanascimento, 
            email, 
            password
        });

        reply.status(200).send({ success: true, message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        reply.status(500).send({ success: false, message: 'Erro ao atualizar o usuário' });
    }
});

server.delete('/user/remove/:id', async (request, reply) => {
    const userId = request.params.id;

    try {
        await dbUser.delete(userId);
        reply.status(200).send({ success: true, message: 'Usuário removido com sucesso' });
    } catch (err) {
        reply.status(500).send({ success: false, message: 'Erro ao remover o usuário' });
    }
});

/* ######### FIM - CHAMADAS PARA A ENTIDADE USER ################### */

/* ######### INÍCIO - CHAMADAS PARA A ENTIDADE LOCAL ################### */
server.post('/locais/create', async (resquest, reply) => {
    const { link, local } = resquest.body;

    await dbLocation.create({
        link,
        local
    });

    return reply.status(201).send();
});

server.get('/locais/recoverAll', async (request, reply) => {
    const respSql = await dbLocation.readAll();

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Nenhum local cadastrado!' });
    }
});

server.get('/locais/readById/:id', async (request, reply) => {
    const locationId = request.params.id;
    const respSql = await dbLocation.readById(locationId);

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Local não cadastrado!' });
    }
});

server.put('/locais/edit', async (request, reply) => {
    try {
        const { id, link, local } = request.body;

        await dbLocation.update({
            id,
            link,
            local
        });

        reply.status(200).send({ success: true, message: 'Local atualizado com sucesso' });
    } catch (error) {
        reply.status(500).send({ success: false, message: 'Erro ao atualizar o local' });
    }
});

server.delete('/locais/remove/:id', async (request, reply) => {
    const locationId = request.params.id;
    
    try {
        await dbLocation.delete(locationId);
        reply.status(200).send({ success: true, message: 'Local removido com sucesso' });
    } catch (err) {
        reply.status(500).send({ success: false, message: 'Erro ao remover o usuário' });
    }
});

/* ######### FIM - CHAMADAS PARA A ENTIDADE USER ################### */

/* ######### INÍCIO - CHAMADAS PARA A ENTIDADE FAQ ################### */
server.post('/faq/create', async (resquest, reply) => {
    const { pergunta, resposta } = resquest.body;

    await dbFaq.create({
        pergunta,
        resposta
    });

    return reply.status(201).send();
});

server.get('/faq/readById/:id', async (request, reply) => {
    const faqId = request.params.id;
    const respSql = await dbFaq.readById(faqId);

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Faq não cadastrado!' });
    }
});

server.get('/faq/recoverAll', async (request, reply) => {
    const respSql = await dbFaq.readAll();

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Nenhum faq cadastrado!' });
    }
});

server.put('/faq/edit', async (request, reply) => {
    try {
        const { id, pergunta, resposta } = request.body;

        await dbFaq.update({
            id,
            pergunta,
            resposta
        });

        reply.status(200).send({ success: true, message: 'Faq atualizado com sucesso' });
    } catch (error) {
        reply.status(500).send({ success: false, message: 'Erro ao atualizar o faq' });
    }
});

server.delete('/faq/remove/:id', async (request, reply) => {
    const faqId = request.params.id;
    
    try {
        await dbFaq.delete(faqId);
        reply.status(200).send({ success: true, message: 'Entrada removida' });
    } catch (err) {
        reply.status(500).send({ success: false, message: 'Erro ao remover' });
    }
});

/* ######### FIM - CHAMADAS PARA A ENTIDADE FAQ ################### */

/* ######### INÍCIO - CHAMADAS PARA A ENTIDADE FÓRUM ################### */
server.post('/forum/create', async (resquest, reply) => {
    const { titulo, postagem, user_id } = resquest.body;

    await dbForum.create({
        titulo,
        postagem,
        user_id
    });

    return reply.status(201).send();
});

server.get('/forum/lerForum', async (request, reply) => {
    const respSql = await dbForum.lerForum();

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Não há tópicos' });
    }
});

server.get('/forum/readById/:id', async (request, reply) => {
    const forumId = request.params.id;
    const respSql = await dbForum.readById(forumId);

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Postagem não existe' });
    }
});

server.put('/forum/edit', async (request, reply) => {
    try {
        const { id, titulo, postagem } = request.body;

        await dbForum.update({
            id,
            titulo,
            postagem
        });

        reply.status(200).send({ success: true, message: 'Editado com sucesso' });
    } catch (error) {
        reply.status(500).send({ success: false, message: 'Erro ao editar' });
    }
});

server.delete('/forum/remove/:id', async (request, reply) => {
    const forumId = request.params.id;
    
    try {
        await dbForum.delete(forumId);
        reply.status(200).send({ success: true, message: 'Entrada removida' });
    } catch (err) {
        reply.status(500).send({ success: false, message: 'Erro ao remover' });
    }
});

server.post('/forum/reply', async (resquest, reply) => {
    const { resposta, user_id, topic_id } = resquest.body;

    await dbForum.reply({
        resposta,
        user_id,
        topic_id
    });

    return reply.status(201).send();
});

server.get('/forum/lerRespostas/:id', async (request, reply) => {
    const forumId = request.params.id;
    const respSql = await dbForum.lerRespostas(forumId);

    if (respSql.length) {
        reply.status(200).send({ Content: respSql, success: true });
    } else {
        reply.status(401).send({ success: false, message: 'Postagem não existe' });
    }
});

server.listen({
    port: 3333
});