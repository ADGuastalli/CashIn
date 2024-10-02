const { User } = require("../models/User");

const checkExpiredMemberships = async () => {
  const users = await User.findAll({ where: { premium: true } });
  const now = new Date();

  for (const user of users) {
    if (user.premium_expiration && now > new Date(user.premium_expiration)) {
      user.premium = false; // Cambia el estado a false
      user.premium_expiration = null; // Limpia la fecha de expiración
      await user.save(); // Guarda los cambios
      console.log(`Membresía de ${user.email} ha expirado.`);
    }
  }
};

const membershipMiddleware = async (req, res, next) => {
  await checkExpiredMemberships();
  next(); // Continúa con la siguiente función de middleware
};

module.exports = membershipMiddleware;
