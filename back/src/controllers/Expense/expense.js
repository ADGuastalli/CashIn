const { Expense } = require('../../models/index');  // Importar el modelo Expense

// CREATE: Crear un nuevo registro en la tabla Expense
const createExpense = async (req, res) => {
  try {
    const { expense_category_id, pay_method_id, expense, mount, date, data_id } = req.body;

    if (!expense_category_id || !pay_method_id || !expense || !mount || !date || !data_id) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newExpense = await Expense.create({ expense_category_id, pay_method_id, expense, mount, date, data_id });
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Expense
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
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
