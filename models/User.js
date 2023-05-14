import { dbcon } from "../db/SequelizeConnection.js";
import { DataTypes } from "sequelize";

export const User = dbcon.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        length: 50
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        length: 50
    }
});