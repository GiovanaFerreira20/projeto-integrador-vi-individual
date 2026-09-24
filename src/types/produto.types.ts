export interface Produto {
    id: number;
    nome: string;
    preco: number;
}

export interface ProdutoEntrada {
    nome: string;
    preco: number;
}

export interface ProdutoAtualizacao {
    nome?: string;
    preco?: number;
}

