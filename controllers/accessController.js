const Access = require('../models/Access');
const AccessHistory = require('../models/AccessHistory');
const Person = require('../models/Person');
const Room = require('../models/Room');

exports.registerEntry = async (req, res) => {
  try {
    const { personId, roomId } = req.body;

    // Verificar aforo
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ msg: 'Sala no encontrada' });
    }

    const currentAccesses = await Access.count({
      where: {
        roomId: roomId,
        status: 'entry',
        exitTime: null,
      },
    });

    if (currentAccesses >= room.capacity) {
      return res.status(400).json({ msg: 'Aforo máximo alcanzado' });
    }

    // Registrar entrada
    const newAccess = await Access.create({
      personId: personId,
      roomId: roomId,
      status: 'entry',
    });

    // Emitir evento a través de Socket.io para actualizar aforo
    req.io.emit('actualizar_aforo', { roomId });

    res.status(201).json(newAccess);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.registerExit = async (req, res) => {
  try {
    const { personId, roomId } = req.body;

    // Buscar el acceso activo
    const access = await Access.findOne({
      where: {
        personId: personId,
        roomId: roomId,
        status: 'entry',
        exitTime: null,
      },
    });

    if (!access) {
      return res.status(404).json({ msg: 'No se encontró un acceso activo' });
    }

    // Actualizar el acceso con la salida
    access.status = 'exit';
    access.exitTime = new Date();
    await access.save();

    // Registrar en el historial
    await AccessHistory.create({
      personId: personId,
      roomId: roomId,
      entryTime: access.entryTime,
      exitTime: access.exitTime,
    });

    // Emitir evento a través de Socket.io para actualizar aforo
    req.io.emit('actualizar_aforo', { roomId });

    res.json(access);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.getPeopleInRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const access = await Access.findAll({
      where: {
        roomId: roomId,
        status: 'entry',
        exitTime: null,
      },
      include: [{ model: Person, attributes: ['id', 'firstName', 'LastName', 'email'] }],
    });

    res.json(access);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};