const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Produtos - Projeto Integrador VI',
            version: '1.0.0',
            description: 'API REST com CRUD completo de produtos, persistência via Sequelize e banco de dados relacional (SQLite).'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ],
        components: {
            schemas: {
                Produto: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'Notebook' },
                        preco: { type: 'number', example: 6700 }
                    }
                },
                ProdutoEntrada: {
                    type: 'object',
                    required: ['nome', 'preco'],
                    properties: {
                        nome: { type: 'string', example: 'Notebook' },
                        preco: { type: 'number', example: 6700 }
                    }
                },
                Erro: {
                    type: 'object',
                    properties: {
                        mensagem: { type: 'string', example: 'Produto não encontrado' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
