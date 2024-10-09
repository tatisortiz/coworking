const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Person = require('./Person');
const Room = require('./Room');

const AccessHistory = sequelize.define('AccessHistory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  entryTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  exitTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'access_history',
  timestamps: false,
});

AccessHistory.belongsTo(Person, { foreignKey: 'personId' });
AccessHistory.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = AccessHistory;