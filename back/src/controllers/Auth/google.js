// controllers/auth/googleAuthController.js
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/index"); // Asegúrate de que la importación sea correcta

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Controlador de autenticación de Google
const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // Verificar el token de Google con la API de Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ error: "Token de Google inválido" });
    }

    // Buscar o crear el usuario en la base de datos
    let user = await User.findOne({ where: { googleId: payload.sub } });
    if (!user) {
      // Crear el usuario si no existe
      user = await User.create({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
      });
    }

    // Generar un JWT con el ID del usuario
    const jwtSecret = process.env.JWT_SECRET;
    const jwtToken = jwt.sign({ userId: user.user_id }, jwtSecret, {
      // Asegúrate de usar user_id
      expiresIn: "24h",
    });

    // Enviar respuesta con el token y los datos del usuario
    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error("Error al autenticar con Google:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  googleAuth,
};
