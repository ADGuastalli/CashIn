const { User, Data, Income, Debt, Expense, ExpenseCategory } = require('../../models/index');  
const { Op } = require('sequelize');
const moment = require('moment'); 


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

  const calculatePaidMortgageDebt = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Buscar al usuario con sus deudas filtradas por tipo 'Hipotecario'
      const userWithDebts = await User.findOne({
        where: { user_id: userId },
        include: {
          model: Data,
          include: {
            model: Debt,
            where: {
              debt: {
                [Op.iLike]: 'hipotecario%' // Filtrar las deudas por "Hipotecario"
              }
            },
            attributes: ['mount', 'date', 'cuote', 'mount_cuote'] // Seleccionar campos necesarios
          }
        }
      });
  
      if (!userWithDebts) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Acceder a las deudas hipotecarias
      const debts = userWithDebts.Datum.Debts;
  
      // Fecha actual
      const today = moment();
  
      // Inicializamos la suma total de cuotas pagadas
      let totalPaid = 0;
  
      // Iterar sobre cada deuda hipotecaria para calcular las cuotas pagadas
      debts.forEach((debt) => {
        const startDate = moment(debt.date); // Convertir la fecha de inicio a un objeto moment
        const monthsPassed = today.diff(startDate, 'months'); // Calcular la diferencia en meses
        const cuotasPagadas = Math.min(monthsPassed, debt.cuote); // Cuotas pagadas no pueden superar las cuotas totales
        const totalPagadoPorDeuda = cuotasPagadas * debt.mount_cuote; // Calcular lo pagado para esa deuda
  
        // Acumular el total de todas las deudas hipotecarias
        totalPaid += totalPagadoPorDeuda;
      });
  
      // Retornar el total de cuotas pagadas, formateado a 2 decimales
      return res.status(200).json({ totalPaid: totalPaid.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular las cuotas pagadas de los hipotecarios: ', error);
      return res.status(500).json({ message: 'Error al calcular las cuotas pagadas de los hipotecarios' });
    }
  };

  const calculatePaidPersonalLoans = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Buscar al usuario con sus deudas filtradas por tipo 'Personales'
      const userWithDebts = await User.findOne({
        where: { user_id: userId },
        include: {
          model: Data,
          include: {
            model: Debt,
            where: {
              debt: {
                [Op.iLike]: 'personal%' // Filtrar las deudas por "Personales"
              }
            },
            attributes: ['mount', 'date', 'cuote', 'mount_cuote'] // Seleccionar campos necesarios
          }
        }
      });
  
      if (!userWithDebts) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Acceder a las deudas personales
      const debts = userWithDebts?.Datum?.Debts || [];

      // Si el usuario no tiene deudas personales
        if (debts.length === 0) {
        return res.status(200).json({ message: 'No posee deudas personales' });
        }
  
      // Fecha actual
      const today = moment();
  
      // Inicializamos la suma total de cuotas pagadas
      let totalPaid = 0;
  
      // Iterar sobre cada deuda personal para calcular las cuotas pagadas
      debts.forEach((debt) => {
        const startDate = moment(debt.date); // Convertir la fecha de inicio a un objeto moment
        const monthsPassed = today.diff(startDate, 'months'); // Calcular la diferencia en meses
        const cuotasPagadas = Math.min(monthsPassed, debt.cuote); // Cuotas pagadas no pueden superar las cuotas totales
        const totalPagadoPorDeuda = cuotasPagadas * debt.mount_cuote; // Calcular lo pagado para esa deuda
  
        // Acumular el total de todas las deudas personales
        totalPaid += totalPagadoPorDeuda;
      });
  
      // Retornar el total de cuotas pagadas, formateado a 2 decimales
      return res.status(200).json({ totalPaid: totalPaid.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular las cuotas pagadas de los préstamos personales: ', error);
      return res.status(500).json({ message: 'Error al calcular las cuotas pagadas de los préstamos personales' });
    }
  };
  
  const calculatePaidVehicleLoans = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Buscar al usuario con sus deudas filtradas por tipo 'Vehiculares'
      const userWithDebts = await User.findOne({
        where: { user_id: userId },
        include: {
          model: Data,
          include: {
            model: Debt,
            where: {
              debt: {
                [Op.iLike]: 'vehicular%' // Filtrar las deudas por "Vehiculares"
              }
            },
            attributes: ['mount', 'date', 'cuote', 'mount_cuote'] // Seleccionar campos necesarios
          }
        }
      });
  
      if (!userWithDebts) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Acceder a las deudas vehiculares
      const debts = userWithDebts?.Datum?.Debts || [];

      // Si el usuario no tiene deudas vehiculares
      if (debts.length === 0) {
        return res.status(200).json({ message: 'No posee deudas vehiculares' });
      }
  
      // Fecha actual
      const today = moment();
  
      // Inicializamos la suma total de cuotas pagadas
      let totalPaid = 0;
  
      // Iterar sobre cada deuda vehicular para calcular las cuotas pagadas
      debts.forEach((debt) => {
        const startDate = moment(debt.date); // Convertir la fecha de inicio a un objeto moment
        const monthsPassed = today.diff(startDate, 'months'); // Calcular la diferencia en meses
        const cuotasPagadas = Math.min(monthsPassed, debt.cuote); // Cuotas pagadas no pueden superar las cuotas totales
        const totalPagadoPorDeuda = cuotasPagadas * debt.mount_cuote; // Calcular lo pagado para esa deuda
  
        // Acumular el total de todas las deudas vehiculares
        totalPaid += totalPagadoPorDeuda;
      });
  
      // Retornar el total de cuotas pagadas, formateado a 2 decimales
      return res.status(200).json({ totalPaid: totalPaid.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular las cuotas pagadas de los préstamos vehiculares: ', error);
      return res.status(500).json({ message: 'Error al calcular las cuotas pagadas de los préstamos vehiculares' });
    }
  };

  const calculateTotalHomeAndServicesExpenses = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Buscar al usuario con sus gastos filtrados por la categoría "Servicios y hogar"
      const userWithExpenses = await User.findOne({
        where: { user_id: userId },
        include: {
          model: Data,
          include: {
            model: Expense,
            include: {
              model: ExpenseCategory,
              where: {
                expense_category: {
                  [Op.iLike]: 'Servicios Domesticos' // Filtrar por la categoría "Servicios y hogar"
                }
              },
              attributes: [] // No necesitamos traer las categorías, solo los montos de los gastos
            },
            attributes: ['mount'] // Seleccionar solo el campo de monto de los gastos
          }
        }
      });
  
      if (!userWithExpenses) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Acceder a los gastos relacionados con "Servicios Domesticos"
      const expenses = userWithExpenses.Datum.Expenses;
  
      // Si el usuario no tiene gastos en esta categoría
      if (!expenses || expenses.length === 0) {
        return res.status(200).json({ message: 'No posee gastos en Servicios Domesticos' });
      }
  
      // Sumar los montos de los gastos
      const totalExpenses = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.dataValues.mount); // Convertir el monto a número y acumular
      }, 0);
  
      // Devolver el total de gastos con dos decimales
      return res.status(200).json({ totalExpenses: totalExpenses.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular los gastos de Servicios Domesticos: ', error);
      return res.status(500).json({ message: 'Error al calcular los gastos de Servicios Domesticos' });
    }
  };
  
  const calculateTotalFoodAndPersonalCareExpenses = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Buscar al usuario con sus gastos filtrados por la categoría "Alimentos y cuidado personal"
      const userWithExpenses = await User.findOne({
        where: { user_id: userId },
        include: {
          model: Data,
          include: {
            model: Expense,
            include: {
              model: ExpenseCategory,
              where: {
                expense_category: {
                  [Op.iLike]: 'Alimentos y cuidado personal' // Filtrar por la categoría "Alimentos y cuidado personal"
                }
              },
              attributes: [] // No necesitas seleccionar ningún atributo de ExpenseCategory
            },
            attributes: ['mount'] // Seleccionar solo el campo de monto de los gastos
          }
        }
      });
  
      if (!userWithExpenses) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Acceder a los gastos relacionados con "Alimentos y cuidado personal"
      const expenses = userWithExpenses.Datum.Expenses;
  
      // Si el usuario no tiene gastos en esta categoría
      if (!expenses || expenses.length === 0) {
        return res.status(200).json({ message: 'No posee gastos en Alimentos y cuidado personal' });
      }
  
      // Sumar los montos de los gastos
      const totalExpenses = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.dataValues.mount); // Convertir el monto a número y acumular
      }, 0);
  
      // Devolver el total de gastos con dos decimales
      return res.status(200).json({ totalExpenses: totalExpenses.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular los gastos de Alimentos y cuidado personal: ', error);
      return res.status(500).json({ message: 'Error al calcular los gastos de Alimentos y cuidado personal' });
    }
  };
  
  const calculateTotalVehicleExpenses = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Buscar al usuario con sus gastos filtrados por la categoría "Vehículo"
      const userWithExpenses = await User.findOne({
        where: { user_id: userId },
        include: {
          model: Data,
          include: {
            model: Expense,
            include: {
              model: ExpenseCategory,
              where: {
                expense_category: {
                  [Op.iLike]: 'Vehiculo' // Filtrar por la categoría "Vehículo"
                }
              },
              attributes: [] // No necesitas seleccionar ningún atributo de ExpenseCategory
            },
            attributes: ['mount'] // Seleccionar solo el campo de monto de los gastos
          }
        }
      });
  
      if (!userWithExpenses) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Acceder a los gastos relacionados con "Vehículo"
      const expenses = userWithExpenses.Datum.Expenses;
  
      // Si el usuario no tiene gastos en esta categoría
      if (!expenses || expenses.length === 0) {
        return res.status(200).json({ message: 'No posee gastos en Vehículo' });
      }
  
      // Sumar los montos de los gastos
      const totalExpenses = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.dataValues.mount); // Convertir el monto a número y acumular
      }, 0);
  
      // Devolver el total de gastos con dos decimales
      return res.status(200).json({ totalExpenses: totalExpenses.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular los gastos de Vehículo: ', error);
      return res.status(500).json({ message: 'Error al calcular los gastos de Vehículo' });
    }
  };

  const calculateTotalTransportExpenses = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Buscar al usuario con sus gastos filtrados por la categoría "Transporte"
      const userWithExpenses = await User.findOne({
        where: { user_id: userId },
        include: {
          model: Data,
          include: {
            model: Expense,
            include: {
              model: ExpenseCategory,
              where: {
                expense_category: {
                  [Op.iLike]: 'Transporte' // Filtrar por la categoría "Transporte"
                }
              },
              attributes: [] // No necesitas seleccionar ningún atributo de ExpenseCategory
            },
            attributes: ['mount'] // Seleccionar solo el campo de monto de los gastos
          }
        }
      });
  
      if (!userWithExpenses) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Acceder a los gastos relacionados con "Transporte"
      const expenses = userWithExpenses.Datum.Expenses;
  
      // Si el usuario no tiene gastos en esta categoría
      if (!expenses || expenses.length === 0) {
        return res.status(200).json({ message: 'No posee gastos en Transporte' });
      }
  
      // Sumar los montos de los gastos
      const totalExpenses = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.dataValues.mount); // Convertir el monto a número y acumular
      }, 0);
  
      // Devolver el total de gastos con dos decimales
      return res.status(200).json({ totalExpenses: totalExpenses.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular los gastos de Transporte: ', error);
      return res.status(500).json({ message: 'Error al calcular los gastos de Transporte' });
    }
  };
  
  const calculateTotalMultipleCategoriesExpenses = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Definir las categorías que quieres buscar
      const categories = ['Hogar', 'Seguros de salud', 'Pensiones'];
  
      // Buscar al usuario con sus gastos filtrados por las categorías definidas
      const userWithExpenses = await User.findOne({
        where: { user_id: userId },
        include: {
          model: Data,
          include: {
            model: Expense,
            include: {
              model: ExpenseCategory,
              where: {
                expense_category: {
                  [Op.iLike]: {
                    [Op.any]: categories // Filtrar por las categorías "Hogar", "Seguros de salud" y "Pensiones"
                  }
                }
              },
              attributes: [] // No necesitas seleccionar ningún atributo de ExpenseCategory
            },
            attributes: ['mount'] // Seleccionar solo el campo de monto de los gastos
          }
        }
      });
  
      if (!userWithExpenses) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Acceder a los gastos relacionados con las categorías especificadas
      const expenses = userWithExpenses.Datum.Expenses;
  
      // Si el usuario no tiene gastos en estas categorías
      if (!expenses || expenses.length === 0) {
        return res.status(200).json({ message: 'No posee gastos en las categorías seleccionadas' });
      }
  
      // Sumar los montos de los gastos
      const totalExpenses = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.dataValues.mount); // Convertir el monto a número y acumular
      }, 0);
  
      // Devolver el total de gastos con dos decimales
      return res.status(200).json({ totalExpenses: totalExpenses.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular los gastos de las categorías: ', error);
      return res.status(500).json({ message: 'Error al calcular los gastos de las categorías' });
    }
  };

  const calculateTotalVacationAndRecreationExpenses = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Definir las categorías que quieres buscar
      const categories = ['Vacaciones', 'Recreacion'];
  
      // Buscar al usuario con sus gastos filtrados por las categorías definidas
      const userWithExpenses = await User.findOne({
        where: { user_id: userId },
        include: {
          model: Data,
          include: {
            model: Expense,
            include: {
              model: ExpenseCategory,
              where: {
                expense_category: {
                  [Op.iLike]: {
                    [Op.any]: categories // Filtrar por las categorías "Vacaciones" y "Recreación"
                  }
                }
              },
              attributes: [] // No necesitas seleccionar ningún atributo de ExpenseCategory
            },
            attributes: ['mount'] // Seleccionar solo el campo de monto de los gastos
          }
        }
      });
  
      if (!userWithExpenses) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Acceder a los gastos relacionados con las categorías especificadas
      const expenses = userWithExpenses.Datum.Expenses;
  
      // Si el usuario no tiene gastos en estas categorías
      if (!expenses || expenses.length === 0) {
        return res.status(200).json({ message: 'No posee gastos en las categorías seleccionadas' });
      }
  
      // Sumar los montos de los gastos
      const totalExpenses = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.dataValues.mount); // Convertir el monto a número y acumular
      }, 0);
  
      // Devolver el total de gastos con dos decimales
      return res.status(200).json({ totalExpenses: totalExpenses.toFixed(2) });
    } catch (error) {
      console.error('Error al calcular los gastos de las categorías: ', error);
      return res.status(500).json({ message: 'Error al calcular los gastos de las categorías' });
    }
  };
  
  
  
  
module.exports = { 
    calculateTotalIncome,
    calculatePaidMortgageDebt,
    calculatePaidVehicleLoans,
    calculatePaidPersonalLoans,
    calculateTotalHomeAndServicesExpenses,
    calculateTotalFoodAndPersonalCareExpenses,
    calculateTotalVehicleExpenses,
    calculateTotalTransportExpenses,
    calculateTotalMultipleCategoriesExpenses,
    calculateTotalVacationAndRecreationExpenses
 };
