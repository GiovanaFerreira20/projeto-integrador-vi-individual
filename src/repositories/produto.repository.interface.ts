import { Produto, ProdutoEntrada, ProdutoAtualizacao } from '../types/produto.types';

export interface IProdutoRepository {
    listar(): Promise<Produto[]>;
    buscarPorId(id: number): Promise<Produto | null>;
    criar(dados: ProdutoEntrada): Promise<Produto>;
    atualizar(id: number, dados: ProdutoAtualizacao): Promise<Produto | null>;
    deletar(id: number): Promise<Produto | null>;
}
