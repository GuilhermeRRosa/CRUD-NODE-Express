import { Sequelize } from "sequelize";

export const dbcon = new Sequelize('testedb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});