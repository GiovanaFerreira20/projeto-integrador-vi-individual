import request from 'supertest';
import app from '../app';
import sequelize from '../src/config/database';

describe('Documentação da API (Swagger)', () => {
    test('GET /api-docs.json retorna a especificação OpenAPI', async () => {
        const res = await request(app).get('/api-docs.json');

        expect(res.status).toBe(200);
        expect(res.body.openapi).toBe('3.0.0');
        expect(res.body.paths).toHaveProperty('/produtos');
    });

    test('GET /api-docs carrega a interface do Swagger UI', async () => {
        const res = await request(app).get('/api-docs/');

        expect(res.status).toBe(200);
        expect(res.text).toContain('swagger-ui');
    });
});

describe('Rotas de Produto (end-to-end)', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('GET /produtos retorna lista vazia inicialmente', async () => {
        const res = await request(app).get('/produtos');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('POST /produtos cria um novo produto', async () => {
        const res = await request(app)
            .post('/produtos')
            .send({ nome: 'Notebook', preco: 6700 });

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({ nome: 'Notebook', preco: 6700 });
    });

    test('POST /produtos retorna 400 quando falta nome ou preço', async () => {
        const res = await request(app)
            .post('/produtos')
            .send({ nome: 'Sem preço' });

        expect(res.status).toBe(400);
        expect(res.body.mensagem).toMatch(/obrigatórios/);
    });

    test('POST /produtos retorna 400 quando preço é menor ou igual a zero', async () => {
        const res = await request(app)
            .post('/produtos')
            .send({ nome: 'Produto inválido', preco: 0 });

        expect(res.status).toBe(400);
        expect(res.body.mensagem).toMatch(/maior que zero/);
    });

    test('GET /produtos/:id retorna o produto criado', async () => {
        const criado = await request(app)
            .post('/produtos')
            .send({ nome: 'Mouse', preco: 120 });

        const res = await request(app).get(`/produtos/${criado.body.id}`);

        expect(res.status).toBe(200);
        expect(res.body.nome).toBe('Mouse');
    });

    test('GET /produtos/:id retorna 404 quando não encontrado', async () => {
        const res = await request(app).get('/produtos/999');

        expect(res.status).toBe(404);
        expect(res.body.mensagem).toBe('Produto não encontrado');
    });

    test('PUT /produtos/:id atualiza um produto existente', async () => {
        const criado = await request(app)
            .post('/produtos')
            .send({ nome: 'Teclado', preco: 250 });

        const res = await request(app)
            .put(`/produtos/${criado.body.id}`)
            .send({ preco: 299 });

        expect(res.status).toBe(200);
        expect(res.body.preco).toBe(299);
    });

    test('PUT /produtos/:id retorna 400 sem campos para atualizar', async () => {
        const criado = await request(app)
            .post('/produtos')
            .send({ nome: 'Monitor', preco: 900 });

        const res = await request(app)
            .put(`/produtos/${criado.body.id}`)
            .send({});

        expect(res.status).toBe(400);
    });

    test('PUT /produtos/:id retorna 400 quando preço é inválido', async () => {
        const criado = await request(app)
            .post('/produtos')
            .send({ nome: 'Webcam', preco: 300 });

        const res = await request(app)
            .put(`/produtos/${criado.body.id}`)
            .send({ preco: -10 });

        expect(res.status).toBe(400);
    });

    test('PUT /produtos/:id retorna 404 quando produto não existe', async () => {
        const res = await request(app)
            .put('/produtos/999')
            .send({ preco: 50 });

        expect(res.status).toBe(404);
    });

    test('DELETE /produtos/:id remove um produto existente', async () => {
        const criado = await request(app)
            .post('/produtos')
            .send({ nome: 'Caixa de som', preco: 180 });

        const res = await request(app).delete(`/produtos/${criado.body.id}`);
        expect(res.status).toBe(204);

        const buscar = await request(app).get(`/produtos/${criado.body.id}`);
        expect(buscar.status).toBe(404);
    });

    test('DELETE /produtos/:id retorna 404 quando produto não existe', async () => {
        const res = await request(app).delete('/produtos/999');
        expect(res.status).toBe(404);
    });
});
