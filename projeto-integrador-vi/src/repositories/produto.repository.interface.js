class ProdutoRepositoryInterface {
    async listar() {
        throw new Error('Método listar() não implementado');
    }

    async buscarPorId(id) {
        throw new Error('Método buscarPorId() não implementado');
    }

    async criar(dados) {
        throw new Error('Método criar() não implementado');
    }

    async atualizar(id, dados) {
        throw new Error('Método atualizar() não implementado');
    }

    async deletar(id) {
        throw new Error('Método deletar() não implementado');
    }
}

module.exports = ProdutoRepositoryInterface;
