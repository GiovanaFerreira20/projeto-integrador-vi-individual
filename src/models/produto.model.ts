import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class ProdutoModel extends Model<InferAttributes<ProdutoModel>, InferCreationAttributes<ProdutoModel>> {
    declare id: CreationOptional<number>;
    declare nome: string;
    declare preco: number;
}

ProdutoModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'produtos',
    timestamps: false
});

export default ProdutoModel;

