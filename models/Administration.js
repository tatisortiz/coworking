const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Administration = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reportDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalAccesses: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalAbsences: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  frequentUsers: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  infrequentUsers: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = Administration;