const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Room = require('./Room');

const Access = sequelize.define('Access', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  entryTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  exitTime: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM('entry', 'exit'),
    allowNull: false,
  },
});

Access.belongsTo(User, { foreignKey: 'userId' });
Access.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = Access;