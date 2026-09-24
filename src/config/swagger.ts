import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const isCompiled = __filename.endsWith('.js');
const routesGlob = path.join(__dirname, isCompiled ? '../routes/*.js' : '../routes/*.ts');

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Produtos - Projeto Integrador VI',
            version: '1.0.0',
            description: 'API REST com CRUD completo de produtos, persistência via Sequelize e banco de dados relacional (SQLite).'
        },
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
    apis: [routesGlob]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

