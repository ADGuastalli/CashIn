const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar el token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Agregar información del usuario a la solicitud
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido' });
  }
}

module.exports = { authenticateToken };