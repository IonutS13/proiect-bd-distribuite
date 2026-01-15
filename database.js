const Sequelize = require('sequelize');
require('dotenv').config();

// Conexiunea 1: Către baza de date de Auth
const sequelizeAuth = new Sequelize('db_auth', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

// Conexiunea 2: Către baza de date de Magazin
const sequelizeShop = new Sequelize('db_shop', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

module.exports = { sequelizeAuth, sequelizeShop };