const app = require('./app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function iniciar() {
    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`Servidor ativo na porta ${PORT}`);
    });
}

iniciar();
