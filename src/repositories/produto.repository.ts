import { IProdutoRepository } from './produto.repository.interface';
import ProdutoModel from '../models/produto.model';
import { Produto, ProdutoEntrada, ProdutoAtualizacao } from '../types/produto.types';

class ProdutoRepository implements IProdutoRepository {
    async listar(): Promise<Produto[]> {
        return ProdutoModel.findAll();
    }

    async buscarPorId(id: number): Promise<Produto | null> {
        return ProdutoModel.findByPk(id);
    }

    async criar(dados: ProdutoEntrada): Promise<Produto> {
        return ProdutoModel.create({
            nome: dados.nome,
            preco: dados.preco
        });
    }

    async atualizar(id: number, dados: ProdutoAtualizacao): Promise<Produto | null> {
        const produto = await ProdutoModel.findByPk(id);

        if (!produto) {
            return null;
        }

        const camposAtualizados: ProdutoAtualizacao = {};
        if (dados.nome !== undefined) camposAtualizados.nome = dados.nome;
        if (dados.preco !== undefined) camposAtualizados.preco = dados.preco;

        return produto.update(camposAtualizados);
    }

    async deletar(id: number): Promise<Produto | null> {
        const produto = await ProdutoModel.findByPk(id);

        if (!produto) {
            return null;
        }

        await produto.destroy();
        return produto;
    }
}

export default ProdutoRepository;

