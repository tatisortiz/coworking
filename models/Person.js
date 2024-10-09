const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startUp: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'person',
  timestamps: false,
});

module.exports = Person;
