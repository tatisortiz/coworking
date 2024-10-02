const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function(req, res, next) {
  // Obtener token del header
  const token = req.header('Authorization')?.split(' ')[1];

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No autorizado, token faltante' });
  }

  // Verificar token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.persona = decoded.persona;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};