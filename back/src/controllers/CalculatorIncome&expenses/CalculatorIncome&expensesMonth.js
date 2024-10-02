const { User, Data, Income, Debt, Expense, ExpenseCategory, Saving, sequelize } = require('../../models/index');  
const { Op } = require('sequelize'); // Asegúrate de tener Sequelize importado para usar los operadores
const moment = require('moment'); // Asegúrate de importar moment al principio del archivo

const calculateTotalIncomeMonthly = async (req, res) => {
  try {
    const userId = req.params.id; // Supongamos que recibes el userId por params
    
    // Obtener el mes y año actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1
    const currentYear = currentDate.getFullYear();

    // Busca al usuario por su ID e incluye la relación con la tabla Data e Income
    const userWithIncome = await User.findOne({
      where: { user_id: userId },  // Busca el usuario por ID
      include: {
        model: Data,           // Incluye la relación con Data
        include: {
          model: Income,       // Incluye la relación con Income
          where: {
            // Filtra por el mes y año actual usando el campo `date` de la tabla Income
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
              [Op.lt]: new Date(currentYear, currentMonth, 1) // Hasta el primer día del mes siguiente
            }
          },
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
        console.log('No se encontraron ingresos para este usuario en el mes actual.');
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

const calculateMonthlyMortgageExpense = async (req, res) => {
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
          attributes: ['mount_cuote'] // Incluir solo el monto de la cuota
        }
      }
    });

    if (!userWithDebts) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Acceder a las deudas hipotecarias
    const debts = userWithDebts.Datum.Debts;

    if (!debts || debts.length === 0) {
      return res.status(200).json({ message: 'No tiene deudas hipotecarias.' });
    }

    // Sumar todas las cuotas mensuales
    const totalMonthlyExpense = debts.reduce((total, debt) => {
      return total + parseFloat(debt.mount_cuote || 0); // Sumar cada cuota, asegurando que sea un número
    }, 0);

    // Retornar el total de gastos hipotecarios mensuales
    return res.status(200).json({ totalMonthlyExpense: totalMonthlyExpense.toFixed(2) });
  } catch (error) {
    console.error('Error al calcular el gasto mensual de los hipotecarios: ', error);
    return res.status(500).json({ message: 'Error al calcular el gasto mensual de los hipotecarios' });
  }
};

const calculateMonthlyPersonalLoanExpense = async (req, res) => {
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
          attributes: ['mount_cuote'] // Solo necesitamos el campo de la cuota mensual
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

    // Calcular el gasto mensual sumando todas las cuotas de los préstamos personales
    const totalMonthlyExpense = debts.reduce((total, debt) => {
      return total + parseFloat(debt.mount_cuote); // Aseguramos convertir a número
    }, 0);

    // Retornar el gasto mensual total, formateado a 2 decimales
    return res.status(200).json({ totalMonthlyExpense: totalMonthlyExpense.toFixed(2) });
  } catch (error) {
    console.error('Error al calcular el gasto mensual de los préstamos personales: ', error);
    return res.status(500).json({ message: 'Error al calcular el gasto mensual de los préstamos personales' });
  }
};

const calculateMonthlyVehicleLoanExpense = async (req, res) => {
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
          attributes: ['mount_cuote'] // Solo necesitamos el campo de la cuota mensual
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

    // Calcular el gasto mensual sumando todas las cuotas de los préstamos vehiculares
    const totalMonthlyExpense = debts.reduce((total, debt) => {
      return total + parseFloat(debt.mount_cuote); // Asegurarse de que el monto es un número
    }, 0);

    // Retornar el gasto mensual total, formateado a 2 decimales
    return res.status(200).json({ totalMonthlyExpense: totalMonthlyExpense.toFixed(2) });
  } catch (error) {
    console.error('Error al calcular el gasto mensual de los préstamos vehiculares: ', error);
    return res.status(500).json({ message: 'Error al calcular el gasto mensual de los préstamos vehiculares' });
  }
};

const calculateMonthlyHomeAndServicesExpenses = async (req, res) => {
  try {
    const userId = req.params.id;

    // Obtener el mes y año actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1
    const currentYear = currentDate.getFullYear();

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
          attributes: ['mount', 'date'], // Seleccionar los campos de monto y fecha de los gastos
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
              [Op.lt]: new Date(currentYear, currentMonth, 1) // Hasta el primer día del mes siguiente
            }
          }
        }
      }
    });

    if (!userWithExpenses) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Acceder a los gastos relacionados con "Servicios Domesticos"
    const expenses = userWithExpenses?.Datum?.Expenses || [];

    // Si el usuario no tiene gastos en esta categoría
    if (expenses.length === 0) {
      return res.status(200).json({ message: 'No posee gastos en Servicios Domesticos' });
    }

    // Sumar los montos de los gastos solo del mes actual
    const totalExpenses = expenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount); // Convertir el monto a número y acumular
    }, 0);

    // Devolver el total de gastos del mes actual con dos decimales
    return res.status(200).json({ totalExpenses: totalExpenses.toFixed(2) });
  } catch (error) {
    console.error('Error al calcular los gastos de Servicios Domesticos: ', error);
    return res.status(500).json({ message: 'Error al calcular los gastos de Servicios Domesticos' });
  }
};

const calculateMonthlyFoodAndPersonalCareExpenses = async (req, res) => {
  try {
    const userId = req.params.id;

    // Obtener el mes y año actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1
    const currentYear = currentDate.getFullYear();

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
          attributes: ['mount', 'date'], // Seleccionar los campos de monto y fecha de los gastos
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
              [Op.lt]: new Date(currentYear, currentMonth, 1) // Hasta el primer día del mes siguiente
            }
          }
        }
      }
    });

    if (!userWithExpenses) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Acceder a los gastos relacionados con "Alimentos y cuidado personal"
    const expenses = userWithExpenses?.Datum?.Expenses || [];

    // Si el usuario no tiene gastos en esta categoría
    if (expenses.length === 0) {
      return res.status(200).json({ message: 'No posee gastos en Alimentos y cuidado personal' });
    }

    // Sumar los montos de los gastos solo del mes actual
    const totalExpenses = expenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount); // Convertir el monto a número y acumular
    }, 0);

    // Devolver el total de gastos del mes actual con dos decimales
    return res.status(200).json({ totalExpenses: totalExpenses.toFixed(2) });
  } catch (error) {
    console.error('Error al calcular los gastos de Alimentos y cuidado personal: ', error);
    return res.status(500).json({ message: 'Error al calcular los gastos de Alimentos y cuidado personal' });
  }
};

const calculateMonthlyVehicleExpenses = async (req, res) => {
  try {
    const userId = req.params.id;

    // Obtener el mes y año actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1
    const currentYear = currentDate.getFullYear();

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
          attributes: ['mount', 'date'], // Seleccionar los campos de monto y fecha de los gastos
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
              [Op.lt]: new Date(currentYear, currentMonth, 1) // Hasta el primer día del mes siguiente
            }
          }
        }
      }
    });

    if (!userWithExpenses) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Acceder a los gastos relacionados con "Vehículo"
    const expenses = userWithExpenses?.Datum?.Expenses || [];

    // Si el usuario no tiene gastos en esta categoría
    if (expenses.length === 0) {
      return res.status(200).json({ message: 'No posee gastos en Vehículo' });
    }

    // Sumar los montos de los gastos solo del mes actual
    const monthlyExpenses = expenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount); // Convertir el monto a número y acumular
    }, 0);

    // Devolver el total de gastos del mes actual con dos decimales
    return res.status(200).json({ monthlyExpenses: monthlyExpenses.toFixed(2) });
  } catch (error) {
    console.error('Error al calcular los gastos de Vehículo: ', error);
    return res.status(500).json({ message: 'Error al calcular los gastos de Vehículo' });
  }
};

const calculateMonthlyTransportExpenses = async (req, res) => {
  try {
    const userId = req.params.id;

    // Obtener el mes y año actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1
    const currentYear = currentDate.getFullYear();

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
          attributes: ['mount', 'date'], // Seleccionar los campos de monto y fecha de los gastos
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
              [Op.lt]: new Date(currentYear, currentMonth, 1) // Hasta el primer día del mes siguiente
            }
          }
        }
      }
    });

    if (!userWithExpenses) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Acceder a los gastos relacionados con "Transporte"
    const expenses = userWithExpenses?.Datum?.Expenses || [];

    // Si el usuario no tiene gastos en esta categoría
    if (expenses.length === 0) {
      return res.status(200).json({ message: 'No posee gastos en Transporte' });
    }

    // Sumar los montos de los gastos solo del mes actual
    const monthlyExpenses = expenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount); // Convertir el monto a número y acumular
    }, 0);

    // Devolver el total de gastos del mes actual con dos decimales
    return res.status(200).json({ monthlyExpenses: monthlyExpenses.toFixed(2) });
  } catch (error) {
    console.error('Error al calcular los gastos de Transporte: ', error);
    return res.status(500).json({ message: 'Error al calcular los gastos de Transporte' });
  }
};

const calculateMonthlyMultipleCategoriesExpenses = async (req, res) => {
  try {
    const userId = req.params.id;

    // Obtener el mes y año actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1
    const currentYear = currentDate.getFullYear();

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
                  [Op.any]: categories // Filtrar por las categorías definidas
                }
              }
            },
            attributes: [] // No necesitas seleccionar ningún atributo de ExpenseCategory
          },
          attributes: ['mount', 'date'], // Seleccionar los campos de monto y fecha de los gastos
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
              [Op.lt]: new Date(currentYear, currentMonth, 1) // Hasta el primer día del mes siguiente
            }
          }
        }
      }
    });

    if (!userWithExpenses) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Acceder a los gastos relacionados con las categorías especificadas
    const expenses = userWithExpenses?.Datum?.Expenses || [];

    // Si el usuario no tiene gastos en estas categorías
    if (expenses.length === 0) {
      return res.status(200).json({ message: 'No posee gastos en las categorías seleccionadas' });
    }

    // Sumar los montos de los gastos solo del mes actual
    const monthlyExpenses = expenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount); // Convertir el monto a número y acumular
    }, 0);

    // Devolver el total de gastos del mes actual con dos decimales
    return res.status(200).json({ monthlyExpenses: monthlyExpenses.toFixed(2) });
  } catch (error) {
    console.error('Error al calcular los gastos de las categorías: ', error);
    return res.status(500).json({ message: 'Error al calcular los gastos de las categorías' });
  }
};

const calculateMonthlyVacationAndRecreationExpenses = async (req, res) => {
  try {
    const userId = req.params.id;

    // Obtener el mes y año actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1
    const currentYear = currentDate.getFullYear();

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
          attributes: ['mount', 'date'], // Seleccionar los campos de monto y fecha de los gastos
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
              [Op.lt]: new Date(currentYear, currentMonth, 1) // Hasta el primer día del mes siguiente
            }
          }
        }
      }
    });

    if (!userWithExpenses) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Acceder a los gastos relacionados con las categorías especificadas
    const expenses = userWithExpenses?.Datum?.Expenses || [];

    // Si el usuario no tiene gastos en estas categorías
    if (expenses.length === 0) {
      return res.status(200).json({ message: 'No posee gastos en las categorías seleccionadas' });
    }

    // Sumar los montos de los gastos solo del mes actual
    const monthlyExpenses = expenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount); // Convertir el monto a número y acumular
    }, 0);

    // Devolver el total de gastos del mes actual con dos decimales
    return res.status(200).json({ monthlyExpenses: monthlyExpenses.toFixed(2) });
  } catch (error) {
    console.error('Error al calcular los gastos de las categorías: ', error);
    return res.status(500).json({ message: 'Error al calcular los gastos de las categorías' });
  }
};

const calculateMonthlyTithesAndSavings = async (req, res) => {
  try {
      const userId = req.params.id;

      // Obtener el mes y año actual
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1
      const currentYear = currentDate.getFullYear();

      // Buscar al usuario con sus gastos filtrados por la categoría "Diezmos"
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
                              [Op.iLike]: 'Diezmos' // Filtrar por la categoría "Diezmos"
                          }
                      },
                      attributes: [] // No necesitas seleccionar ningún atributo de ExpenseCategory
                  },
                  attributes: ['mount', 'date'], // Seleccionar los campos de monto y fecha de los gastos
                  where: {
                      date: {
                          [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
                          [Op.lt]: new Date(currentYear, currentMonth, 1) // Hasta el primer día del mes siguiente
                      }
                  }
              }
          }
      });

      if (!userWithExpenses) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Acceder a los gastos relacionados con "Diezmos"
      const expenses = userWithExpenses?.Datum?.Expenses || [];

      // Sumar los montos de los gastos de Diezmos solo del mes actual
      const monthlyTithesExpenses = expenses.reduce((total, expense) => {
          return total + parseFloat(expense.mount); // Convertir el monto a número y acumular
      }, 0);

      // Buscar los ahorros del usuario en la tabla Saving
      const savings = await Saving.findAll({
          where: {
              date: {
                  [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
                  [Op.lt]: new Date(currentYear, currentMonth, 1) // Hasta el primer día del mes siguiente
              }
          }
      });

      // Sumar los ahorros solo del mes actual
      const monthlySavings = savings.reduce((total, saving) => {
          return total + parseFloat(saving.mount); // Convertir el monto a número y acumular
      }, 0);

      // Sumar los gastos de Diezmos y los ahorros
      const totalMonthly = (monthlyTithesExpenses + monthlySavings).toFixed(2);

      // Devolver la suma total de Diezmos y Ahorros del mes actual
      return res.status(200).json({
          totalMonthly: totalMonthly
      });
  } catch (error) {
      console.error('Error al calcular los gastos de Diezmos y Ahorros: ', error);
      return res.status(500).json({ message: 'Error al calcular los gastos de Diezmos y Ahorros' });
  }
};

module.exports = {
  calculateTotalIncomeMonthly,
  calculateMonthlyMortgageExpense,
  calculateMonthlyPersonalLoanExpense,
  calculateMonthlyVehicleLoanExpense,
  calculateMonthlyHomeAndServicesExpenses,
  calculateMonthlyFoodAndPersonalCareExpenses,
  calculateMonthlyVehicleExpenses,
  calculateMonthlyTransportExpenses,
  calculateMonthlyMultipleCategoriesExpenses,
  calculateMonthlyVacationAndRecreationExpenses,
  calculateMonthlyTithesAndSavings
}