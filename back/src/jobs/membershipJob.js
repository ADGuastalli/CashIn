const cron = require("node-cron");
const { User } = require("../models/index");

// Función para verificar membresías
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

// Programa la tarea para ejecutarse todos los días a la medianoche
cron.schedule("0 0 * * *", async () => {
  console.log("Verificando membresías expiradas...");
  await checkExpiredMemberships();
});
