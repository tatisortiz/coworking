const express = require('express');
const { getCurrentRoomState } = require('../controllers/roomController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener estado actual de una sala
router.get('/:id/current-status', authMiddleware, getCurrentRoomState);

module.exports = router;