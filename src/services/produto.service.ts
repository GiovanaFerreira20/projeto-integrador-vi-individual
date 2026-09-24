import ProdutoRepository from '../repositories/produto.repository';
import { IProdutoRepository } from '../repositories/produto.repository.interface';
import { Produto, ProdutoEntrada, ProdutoAtualizacao } from '../types/produto.types';

export class ProdutoService {
    private repository: IProdutoRepository;

    constructor(repository: IProdutoRepository = new ProdutoRepository()) {
        this.repository = repository;
    }

    async listar(): Promise<Produto[]> {
        return this.repository.listar();
    }

    async buscarPorId(id: number): Promise<Produto | null> {
        return this.repository.buscarPorId(id);
    }

    async criar(dados: ProdutoEntrada): Promise<Produto> {
        return this.repository.criar(dados);
    }

    async atualizar(id: number, dados: ProdutoAtualizacao): Promise<Produto | null> {
        return this.repository.atualizar(id, dados);
    }

    async deletar(id: number): Promise<Produto | null> {
        return this.repository.deletar(id);
    }
}

const produtoService = new ProdutoService();

export default produtoService;

