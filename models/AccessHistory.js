const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
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
});

AccessHistory.belongsTo(User, { foreignKey: 'userId' });
AccessHistory.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = AccessHistory;