const { User, Data, Income } = require('../models');  // Asegúrate de importar los modelos correctos

// Controlador para calcular ingresos totales
const calculateTotalIncome = async (req, res) => {
  try {
    const userId = req.params.userId; // Supongamos que recibes el userId por params

    // Busca al usuario por su ID e incluye la relación con la tabla Data e Income
    const userWithIncome = await User.findOne({
      where: { id: userId },  // Busca el usuario por ID
      include: {
        model: Data,           // Incluye la relación con Data
        include: {
          model: Income,       // Incluye la relación con Income
          attributes: ['mount']  // Selecciona solo la columna de ingresos
        }
      }
    });

    if (!userWithIncome) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Calcula la suma total de ingresos
    const totalIncome = userWithIncome.Data.Incomes.reduce((total, income) => {
      return total + income.mount;  // Suma los valores de mount
    }, 0);

    // Devuelve el total de ingresos
    return res.status(200).json({ totalIncome });
  } catch (error) {
    console.error('Error al calcular los ingresos: ', error);
    return res.status(500).json({ message: 'Error al calcular los ingresos' });
  }
};

module.exports = { calculateTotalIncome };
