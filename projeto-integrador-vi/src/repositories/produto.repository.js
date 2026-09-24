const ProdutoRepositoryInterface = require('./produto.repository.interface');
const ProdutoModel = require('../models/produto.model');

class ProdutoRepository extends ProdutoRepositoryInterface {
    async listar() {
        return ProdutoModel.findAll();
    }

    async buscarPorId(id) {
        return ProdutoModel.findByPk(id);
    }

    async criar(dados) {
        return ProdutoModel.create({
            nome: dados.nome,
            preco: dados.preco
        });
    }

    async atualizar(id, dados) {
        const produto = await ProdutoModel.findByPk(id);

        if (!produto) {
            return null;
        }

        const camposAtualizados = {};
        if (dados.nome !== undefined) camposAtualizados.nome = dados.nome;
        if (dados.preco !== undefined) camposAtualizados.preco = dados.preco;

        return produto.update(camposAtualizados);
    }

    async deletar(id) {
        const produto = await ProdutoModel.findByPk(id);

        if (!produto) {
            return null;
        }

        await produto.destroy();
        return produto;
    }
}

module.exports = ProdutoRepository;
