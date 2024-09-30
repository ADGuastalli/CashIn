const { User, Data, Income, Debt } = require('../../models/index');  // Asegúrate de importar los modelos correctos
const { Op } = require('sequelize');

// Controlador para calcular ingresos totales
const calculateTotalIncome = async (req, res) => {
    try {
      const userId = req.params.id; // Supongamos que recibes el userId por params
      
      // Busca al usuario por su ID e incluye la relación con la tabla Data e Income
      const userWithIncome = await User.findOne({
        where: { user_id: userId },  // Busca el usuario por ID
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
  
      const calculateTotalIncome = (userWithIncome) => {
        // Verificamos que el usuario tenga ingresos
        if (userWithIncome && userWithIncome.Datum && userWithIncome.Datum.Incomes) {
          const incomes = userWithIncome.Datum.Incomes;
  
          // Sumar los montos de cada ingreso
          const totalIncome = incomes.reduce((total, income) => {
            // Convertir 'mount' a número y sumar al total
            return total + parseFloat(income.dataValues.mount);
          }, 0);
  
          console.log(`El ingreso total es: ${totalIncome.toFixed(2)}`);
          return totalIncome; // Devuelve el ingreso total
        } else {
          console.log('No se encontraron ingresos para este usuario.');
          return 0; // Retorna 0 si no hay ingresos
        }
      };
      
      // Llamar a la función con el usuario
      const totalIncome = calculateTotalIncome(userWithIncome);
  
      // Devuelve el total de ingresos con dos decimales
      return res.status(200).json({ totalIncome: totalIncome.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular los ingresos: ', error);
      return res.status(500).json({ message: 'Error al calcular los ingresos' });
    }
  };

  const calculateTotalMortgageDebt = async (req, res) => {
    try {
      const userId = req.params.id; // Supongamos que recibes el userId por params
      
      // Busca al usuario por su ID e incluye la relación con la tabla Data y Debt
      const userWithDebts = await User.findOne({
        where: { user_id: userId },  // Busca el usuario por ID
        include: {
          model: Data,  // Incluye la relación con Data
          include: {
            model: Debt, // Incluye la relación con Debt
            where: {
                debt: {
                  [Op.iLike]: 'hipotecario%' // Filtra las deudas que son hipotecarias, insensible a mayúsculas
                }
              },
            attributes: ['mount'] // Selecciona solo la columna de montos
          }
        }
      });
  
      if (!userWithDebts) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Accede a las deudas hipotecarias
      const debts = userWithDebts.Datum.Debts;
  
      // Suma los montos de las deudas hipotecarias
      const totalMortgageDebt = debts.reduce((total, debt) => {
        return total + parseFloat(debt.dataValues.mount); // Convierte el monto a número y acumula
      }, 0);
  
      // Devuelve el total de gastos hipotecarios con dos decimales
      return res.status(200).json({ totalMortgageDebt: totalMortgageDebt.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular los gastos hipotecarios: ', error);
      return res.status(500).json({ message: 'Error al calcular los gastos hipotecarios' });
    }
  };
  
  
module.exports = { 
    calculateTotalIncome,
    calculateTotalMortgageDebt
 };
