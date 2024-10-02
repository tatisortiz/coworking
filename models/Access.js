const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Person = require('./Person');
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
}, {
  tableName: 'access',
  timestamps: false,
});

Access.belongsTo(Person, { foreignKey: 'personId' });
Access.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = Access;