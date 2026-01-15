const { DataTypes } = require('sequelize');
const { sequelizeAuth } = require('../config/database');

const User = sequelizeAuth.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
}, { timestamps: false, tableName: 'users' });

module.exports = User;