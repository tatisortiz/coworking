const express = require('express');
const { registerEntry, registerExit, getPeopleInRoom } = require('../controllers/accessController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Registrar entrada
router.post('/entry', authMiddleware, registerEntry);

// Registrar salida
router.post('/exit', authMiddleware, registerExit);

// Obtener personas actualmente en una sala
router.get('/current/room/:roomId', authMiddleware, getPeopleInRoom);

module.exports = router;