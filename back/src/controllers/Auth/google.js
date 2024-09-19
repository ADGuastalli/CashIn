// controllers/auth/googleAuthController.js
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/User'); // Ajustar según la ubicación de tu modelo de usuario

// Estrategia de Google
const googleAuth = (req, res) => {
  passport.authenticate('google', { failureRedirect: '/' }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Error al autenticar con Google' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '24h' });

    // Redirigir al frontend con el token
    res.redirect(`http://localhost:3000/profile?token=${token}`);
  })(req, res);
};

module.exports = {
  googleAuth,
};
