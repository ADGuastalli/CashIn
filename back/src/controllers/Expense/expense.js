const { Expense , ExpenseCategory, PayMethod, User , Data} = require('../../models/index');  // Importar el modelo Expense
const { Op } = require('sequelize')

function convertDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Los meses en JavaScript son 0-indexados
}

// CREATE: Crear un nuevo registro en la tabla Expense
const createExpense = async (req, res) => {
  try {
    const { expense_category_id, pay_method_id, expense, mount, date, user_id } = req.body;

    // Verificar que el user_id y otros datos requeridos están presentes
    if (!expense_category_id || !pay_method_id || !expense || !mount || !date || !user_id) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Buscar el data_id en la tabla Data usando el user_id
    const dataRecord = await Data.findOne({ where: { user_id } }); // Suponemos que tienes un modelo `Data`
    
    if (!dataRecord) {
      return res.status(404).json({ error: 'No se encontró el data_id para este usuario' });
    }

    const { data_id } = dataRecord; // Obtener el data_id del registro encontrado en Data

    // Crear el nuevo gasto (expense)
    const newExpense = await Expense.create({
      expense_category_id,
      pay_method_id,
      expense,
      mount,
      date,
      data_id // Usar el data_id recuperado de la tabla Data
    });

    // Responder con el gasto creado
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

const getAllExpensesAllUsers = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener todos los registros de la tabla Expense
const getAllExpenses = async (req, res) => {
  const { id } = req.params;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();

  try {
    const userWithExpenses = await User.findOne({
      where: { user_id: id },  
      include: {
        model: Data,           
        include: {
          model: Expense,       
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), 
              [Op.lt]: new Date(currentYear, currentMonth, 1) 
            }
          }
        }
      }
    });
    if (!userWithExpenses) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    if (userWithExpenses.Datum !== null && userWithExpenses.Datum.Expense !== null) {
      const expenses = userWithExpenses.Datum.Expense;
      const mappedExpense = await Promise.all(expenses.map(async (expense) => {
        const idCategory = expense.expense_category_id;
        const idPay = expense.pay_method_id;
  
        // Obtener los datos de ExpenseCategory y PayMethod
        const [expenseCategory, paymethod] = await Promise.all([
          ExpenseCategory.findByPk(idCategory),
          PayMethod.findByPk(idPay)
        ]);
  
        return {
          expense_id: expense.expense_id,
          expense_category: expenseCategory ? expenseCategory.expense_category : null,
          pay_method: paymethod ? paymethod.pay_method : null,
          expense: expense.expense, 
          mount: expense.mount, 
          date: expense.date 
        };
      }));
      res.status(200).json(mappedExpense);
    }

  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { expense_type_id, pay_method_id, expense, mount, date } = req.body;

    const existingExpense = await Expense.findByPk(id);

    if (!existingExpense) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingExpense.update({ expense_type_id, pay_method_id, expense, mount, date });
    res.status(200).json(existingExpense);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await expense.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getAllExpensesAllUsers,
  getExpenseById,
  updateExpense,
  deleteExpense
};
