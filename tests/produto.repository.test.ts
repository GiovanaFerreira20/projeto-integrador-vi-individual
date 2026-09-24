import sequelize from '../src/config/database';
import ProdutoRepository from '../src/repositories/produto.repository';

describe('ProdutoRepository (integração com SQLite em memória)', () => {
    const repository = new ProdutoRepository();

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('criar persiste um novo produto', async () => {
        const produto = await repository.criar({ nome: 'Notebook', preco: 6700 });

        expect(produto.id).toBeDefined();
        expect(produto.nome).toBe('Notebook');
    });

    test('listar retorna os produtos cadastrados', async () => {
        await repository.criar({ nome: 'Notebook', preco: 6700 });
        await repository.criar({ nome: 'Mouse', preco: 120 });

        const produtos = await repository.listar();
        expect(produtos).toHaveLength(2);
    });

    test('buscarPorId retorna o produto correto', async () => {
        const criado = await repository.criar({ nome: 'Teclado', preco: 250 });

        const encontrado = await repository.buscarPorId(criado.id);
        expect(encontrado?.nome).toBe('Teclado');
    });

    test('buscarPorId retorna null quando não encontrado', async () => {
        const encontrado = await repository.buscarPorId(999);
        expect(encontrado).toBeNull();
    });

    test('atualizar modifica os campos informados', async () => {
        const criado = await repository.criar({ nome: 'Monitor', preco: 900 });

        const atualizado = await repository.atualizar(criado.id, { preco: 850 });
        expect(atualizado?.preco).toBe(850);
        expect(atualizado?.nome).toBe('Monitor');
    });

    test('atualizar altera somente o nome quando só ele é informado', async () => {
        const criado = await repository.criar({ nome: 'Impressora', preco: 500 });

        const atualizado = await repository.atualizar(criado.id, { nome: 'Impressora Laser' });
        expect(atualizado?.nome).toBe('Impressora Laser');
        expect(atualizado?.preco).toBe(500);
    });

    test('atualizar retorna null quando produto não existe', async () => {
        const resultado = await repository.atualizar(999, { preco: 10 });
        expect(resultado).toBeNull();
    });

    test('deletar remove o produto', async () => {
        const criado = await repository.criar({ nome: 'Webcam', preco: 300 });

        const removido = await repository.deletar(criado.id);
        expect(removido?.nome).toBe('Webcam');

        const encontrado = await repository.buscarPorId(criado.id);
        expect(encontrado).toBeNull();
    });

    test('deletar retorna null quando produto não existe', async () => {
        const resultado = await repository.deletar(999);
        expect(resultado).toBeNull();
    });
});
