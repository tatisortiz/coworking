const express = require('express');
const { generateDailyReport, getReports, getUseRooms } = require('../controllers/administrationController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Generar reporte diario
router.post('/daily-report', authMiddleware, generateDailyReport);

// Obtener reportes en un rango de fechas
router.get('/reports', authMiddleware, getReports);

// Obtener estadísticas de uso de salas
router.get('/room-usage', authMiddleware, getUseRooms);

module.exports = router;