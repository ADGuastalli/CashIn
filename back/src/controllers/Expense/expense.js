const { Expense , ExpenseCategory, PayMethod, User , Data} = require('../../models/index');  // Importar el modelo Expense

function convertDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Los meses en JavaScript son 0-indexados
}

// CREATE: Crear un nuevo registro en la tabla Expense
const createExpense = async (req, res) => {
  try {
    const { expense_category, pay_method, expense, mount, date, user_id } = req.body;
  
    if (!expense_category || !pay_method || !expense || !mount || !date) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const formattedDate = convertDate(date);

    const userdata =  await User.findOne({
      where: {user_id},
      include: [{
        model: Data,
        attributes: ['data_id']
      }]
    })

    const data_id = userdata.Datum.data_id

    const expenseType = await ExpenseCategory.findOne({ where: { expense_category: expense_category.toLowerCase() } });
    if (!expenseType) {
      return res.status(400).json({ error: 'Tipo de gasto no encontrado' });
    }

    const payMethod = await PayMethod.findOne({ where: { pay_method: pay_method.toLowerCase() } });

    if (!payMethod) {
      return res.status(400).json({ error: 'Método de pago no encontrado' });
    }
    const expense_category_id = expenseType.expense_category_id
    const pay_method_id = payMethod.pay_method_id

    const newExpense = await Expense.create({ 
      expense_category_id,
      pay_method_id, 
      expense, mount, 
      date: formattedDate, 
      data_id });
      
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Expense
const getAllExpenses = async (req, res) => {
  const { id } = req.params;

  try {
    const expenses = await Expense.findAll({
      include: [{
        model: Data,
        where: { user_id: id }, // Filtrar por user_id
      }],
    });
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
  getExpenseById,
  updateExpense,
  deleteExpense
};
