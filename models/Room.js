const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Room = sequelize.define('Room', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roomType: {
    type: DataTypes.ENUM('meeting', 'office'),
    allowNull: false,
  },
}, {
  tableName: 'room',
  timestamps: false,
});

module.exports = Room;
