const express = require('express');
const { getCurrentRoomState, getAvailableRooms } = require('../controllers/roomController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener salas disponibles
router.get('/get-rooms', authMiddleware, getAvailableRooms);

// Obtener estado actual de una sala
router.get('/:id/current-status', authMiddleware, getCurrentRoomState);

module.exports = router;