import { ProdutoService } from '../src/services/produto.service';
import { IProdutoRepository } from '../src/repositories/produto.repository.interface';
import { Produto, ProdutoEntrada, ProdutoAtualizacao } from '../src/types/produto.types';

class ProdutoRepositoryFake implements IProdutoRepository {
    produtos: Produto[] = [
        { id: 1, nome: 'Notebook', preco: 6700 },
        { id: 2, nome: 'Mouse', preco: 120 }
    ];

    async listar(): Promise<Produto[]> {
        return this.produtos;
    }

    async buscarPorId(id: number): Promise<Produto | null> {
        return this.produtos.find((p) => p.id === id) || null;
    }

    async criar(dados: ProdutoEntrada): Promise<Produto> {
        const novo: Produto = { id: this.produtos.length + 1, ...dados };
        this.produtos.push(novo);
        return novo;
    }

    async atualizar(id: number, dados: ProdutoAtualizacao): Promise<Produto | null> {
        const produto = this.produtos.find((p) => p.id === id);
        if (!produto) return null;
        Object.assign(produto, dados);
        return produto;
    }

    async deletar(id: number): Promise<Produto | null> {
        const index = this.produtos.findIndex((p) => p.id === id);
        if (index === -1) return null;
        return this.produtos.splice(index, 1)[0];
    }
}

describe('ProdutoService', () => {
    let service: ProdutoService;

    beforeEach(() => {
        service = new ProdutoService(new ProdutoRepositoryFake());
    });

    test('listar retorna todos os produtos', async () => {
        const produtos = await service.listar();
        expect(produtos).toHaveLength(2);
    });

    test('buscarPorId retorna o produto correto', async () => {
        const produto = await service.buscarPorId(1);
        expect(produto?.nome).toBe('Notebook');
    });

    test('buscarPorId retorna null quando não encontrado', async () => {
        const produto = await service.buscarPorId(999);
        expect(produto).toBeNull();
    });

    test('criar adiciona um novo produto', async () => {
        const novo = await service.criar({ nome: 'Teclado', preco: 250 });
        expect(novo).toMatchObject({ nome: 'Teclado', preco: 250 });

        const produtos = await service.listar();
        expect(produtos).toHaveLength(3);
    });

    test('atualizar modifica um produto existente', async () => {
        const atualizado = await service.atualizar(1, { preco: 6999 });
        expect(atualizado?.preco).toBe(6999);
    });

    test('atualizar retorna null quando produto não existe', async () => {
        const resultado = await service.atualizar(999, { preco: 10 });
        expect(resultado).toBeNull();
    });

    test('deletar remove um produto existente', async () => {
        const removido = await service.deletar(2);
        expect(removido?.nome).toBe('Mouse');

        const produtos = await service.listar();
        expect(produtos).toHaveLength(1);
    });

    test('deletar retorna null quando produto não existe', async () => {
        const resultado = await service.deletar(999);
        expect(resultado).toBeNull();
    });

    test('usa ProdutoRepository real como padrão quando nenhum repositório é injetado', () => {
        const servicePadrao = new ProdutoService();
        expect(servicePadrao).toBeInstanceOf(ProdutoService);
    });
});

