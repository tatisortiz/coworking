const express = require('express');
const { getCurrentAccess, getAccessHistory } = require('../controllers/personController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener acceso actual de una persona
router.get('/:id/current-access', authMiddleware, getCurrentAccess);

// Obtener historial de accesos de una persona
router.get('/:id/access-history', authMiddleware, getAccessHistory);

module.exports = router;