import { Request, Response } from 'express';
import service from '../services/produto.service';

export async function listar(req: Request, res: Response): Promise<void> {
    const produtos = await service.listar();
    res.status(200).json(produtos);
}

export async function buscarPorId(req: Request, res: Response): Promise<Response | void> {
    const id = Number(req.params.id);
    const produto = await service.buscarPorId(id);

    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(200).json(produto);
}

export async function criar(req: Request, res: Response): Promise<Response | void> {
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({ mensagem: 'Nome e preço são obrigatórios' });
    }

    if (preco <= 0) {
        return res.status(400).json({ mensagem: 'O preço deve ser maior que zero' });
    }

    const novoProduto = await service.criar({ nome, preco });
    res.status(201).json(novoProduto);
}

export async function atualizar(req: Request, res: Response): Promise<Response | void> {
    const id = Number(req.params.id);
    const { nome, preco } = req.body;

    if (nome === undefined && preco === undefined) {
        return res.status(400).json({ mensagem: 'Informe ao menos um campo para atualizar (nome ou preço)' });
    }

    if (preco !== undefined && preco <= 0) {
        return res.status(400).json({ mensagem: 'O preço deve ser maior que zero' });
    }

    const produtoAtualizado = await service.atualizar(id, { nome, preco });

    if (!produtoAtualizado) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(200).json(produtoAtualizado);
}

export async function deletar(req: Request, res: Response): Promise<Response | void> {
    const id = Number(req.params.id);
    const produtoRemovido = await service.deletar(id);

    if (!produtoRemovido) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(204).send();
}

