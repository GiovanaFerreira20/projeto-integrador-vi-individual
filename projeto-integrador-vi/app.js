const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./src/config/swagger');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-docs.json', (req, res) => {
    res.status(200).json(swaggerSpec);
});

const produtoRoutes = require('./src/routes/produto.routes');

app.use(produtoRoutes);

module.exports = app;
