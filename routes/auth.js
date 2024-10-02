const express = require('express');
const { registerUser, authenticateUser } = require('../controllers/authController');
const router = express.Router();

// Registro de usuarios
router.post('/register', registerUser);

// Autenticación de usuarios
router.post('/login', authenticateUser);

module.exports = router;