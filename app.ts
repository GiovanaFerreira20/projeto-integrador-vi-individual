import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger';
import produtoRoutes from './src/routes/produto.routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-docs.json', (req, res) => {
    res.status(200).json(swaggerSpec);
});

app.use(produtoRoutes);

export default app;
