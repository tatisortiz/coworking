const Access = require('../models/Access');
const AccessHistory = require('../models/AccessHistory');
const Room = require('../models/Room');

exports.getCurrentAccess = async (req, res) => {
  try {
    const { id } = req.params;

    const access = await Access.findOne({
      where: {
        personId: id,
        status: 'entry',
        exitTime: null,
      },
      include: [{ model: Room, attributes: ['id', 'roomName'] }],
    });

    if (!access) {
      return res.status(404).json({ msg: 'No hay acceso actual para esta persona' });
    }

    res.json(access);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.getAccessHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await AccessHistory.findAll({
      where: {
        personId: id,
      },
      include: [{ model: Room, attributes: ['id', 'roomName'] }],
    });

    res.json(history);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};