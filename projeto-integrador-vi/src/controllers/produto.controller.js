const service = require('../services/produto.service');

async function listar(req, res) {
    const produtos = await service.listar();

    res.status(200).json(produtos);
}

async function buscarPorId(req, res) {
    const id = Number(req.params.id);

    const produto = await service.buscarPorId(id);

    if (!produto) {
        return res.status(404).json({
            mensagem: 'Produto não encontrado'
        });
    }

    res.status(200).json(produto);
}

async function criar(req, res) {
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({
            mensagem: 'Nome e preço são obrigatórios'
        });
    }

    if (preco <= 0) {
        return res.status(400).json({
            mensagem: 'O preço deve ser maior que zero'
        });
    }

    const novoProduto = await service.criar({ nome, preco });

    res.status(201).json(novoProduto);
}

async function atualizar(req, res) {
    const id = Number(req.params.id);
    const { nome, preco } = req.body;

    if (nome === undefined && preco === undefined) {
        return res.status(400).json({
            mensagem: 'Informe ao menos um campo para atualizar (nome ou preço)'
        });
    }

    if (preco !== undefined && preco <= 0) {
        return res.status(400).json({
            mensagem: 'O preço deve ser maior que zero'
        });
    }

    const produtoAtualizado = await service.atualizar(id, { nome, preco });

    if (!produtoAtualizado) {
        return res.status(404).json({
            mensagem: 'Produto não encontrado'
        });
    }

    res.status(200).json(produtoAtualizado);
}

async function deletar(req, res) {
    const id = Number(req.params.id);

    const produtoRemovido = await service.deletar(id);

    if (!produtoRemovido) {
        return res.status(404).json({
            mensagem: 'Produto não encontrado'
        });
    }

    res.status(204).send();
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar
};
