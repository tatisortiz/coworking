const Room = require('../models/Room');
const Access = require('../models/Access');
const Person = require('../models/Person');
const { sequelize } = require('../config/database');

exports.getCurrentRoomState = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ msg: 'Sala no encontrada' });
    }

    const access = await Access.findAll({
      where: {
        roomId: id,
        status: 'entry',
        exitTime: null,
      },
      include: [{ model: Person, attributes: ['id', 'firstName', 'lastName', 'email'] }],
    });

    res.json({
      roomId: room.id,
      roomName: room.roomName,
      capacity: room.capacity,
      roomType: room.roomType,
      personsPresent: access,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener todas las salas
exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms); 
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
};