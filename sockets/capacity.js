const Room = require('../models/Room');
const Access = require('../models/Access');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Escuchar eventos para actualizar capacidad
    socket.on('actualizar_aforo', async ({ roomId }) => {
      try {
        const room = await Room.findByPk(roomId);
        if (!room) {
          return;
        }

        const currentCapacity = await Access.count({
          where: {
            roomId: roomId,
            status: 'entry',
            exitTime: null,
          },
        });

        // Emitir la actualización a todos los clientes
        io.emit('aforo_actualizado', { roomId, currentCapacity });
      } catch (error) {
        console.error(error.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};