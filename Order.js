const { DataTypes } = require('sequelize');
const { sequelizeShop } = require('../config/database');
const Product = require('./Product');

const Order = sequelizeShop.define('Order', {
    user_id: { type: DataTypes.INTEGER, allowNull: false }, // ID-ul vine din cealaltă bază de date!
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
}, { timestamps: true, updatedAt: false, tableName: 'orders' });

// Relație între tabele din aceeași bază
Order.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Order;