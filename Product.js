const { DataTypes } = require('sequelize');
const { sequelizeShop } = require('../config/database');

const Product = sequelizeShop.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 100 },
    imageUrl: { type: DataTypes.STRING, allowNull: true } // <--- Am adăugat asta
}, { timestamps: false, tableName: 'products' });

module.exports = Product;