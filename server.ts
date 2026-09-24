import app from './app';
import sequelize from './src/config/database';

const PORT = process.env.PORT || 3000;

async function iniciar(): Promise<void> {
    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`Servidor ativo na porta ${PORT}`);
    });
}

iniciar();
