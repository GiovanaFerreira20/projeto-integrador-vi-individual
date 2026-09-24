const ProdutoRepository = require('../repositories/produto.repository');

class ProdutoService {
    constructor(repository = new ProdutoRepository()) {
        this.repository = repository;
    }

    async listar() {
        return this.repository.listar();
    }

    async buscarPorId(id) {
        return this.repository.buscarPorId(id);
    }

    async criar(dados) {
        return this.repository.criar(dados);
    }

    async atualizar(id, dados) {
        return this.repository.atualizar(id, dados);
    }

    async deletar(id) {
        return this.repository.deletar(id);
    }
}

module.exports = new ProdutoService();
module.exports.ProdutoService = ProdutoService;
