const { ExpenseCategory } = require('../../models/index');  // Importar el modelo ExpenseType

// CREATE: Crear un nuevo registro en la tabla ExpenseType
const createExpenseCategory = async (req, res) => {
  try {
    const { expense_category } = req.body;

    if (!expense_category) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newExpenseCategory = await ExpenseCategory.create({ expense_category });
    res.status(201).json(newExpenseCategory);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla ExpenseType
const getAllExpenseCategorys = async (req, res) => {
    try {
      const expenseCategorys = await ExpenseCategory.findAll();
      res.status(200).json(expenseCategorys);
    } catch (error) {
      console.error('Error al obtener los registros:', error);
      res.status(500).json({ error: 'Error al obtener los registros' });
    }
  };
  
  // READ: Obtener un registro por ID
  const getExpenseCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const expenseCategory = await ExpenseCategory.findByPk(id);
  
      if (!expenseCategory) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
  
      res.status(200).json(expenseCategory);
    } catch (error) {
      console.error('Error al obtener el registro:', error);
      res.status(500).json({ error: 'Error al obtener el registro' });
    }
  };
  
  // UPDATE: Actualizar un registro existente
  const updateExpenseCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { expense_category } = req.body;
  
      const existingExpenseCategory = await ExpenseCategory.findByPk(id);
  
      if (!existingExpenseCategory) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
  
      await existingExpenseCategory.update({ expense_category });
      res.status(200).json(existingExpenseCategory);
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      res.status(500).json({ error: 'Error al actualizar el registro' });
    }
  };
  
  // DELETE: Eliminar un registro por ID
  const deleteExpenseCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const expenseCategory = await ExpenseCategory.findByPk(id);
  
      if (!expenseCategory) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
  
      await expenseCategory.destroy();
      res.status(200).json({ message: 'Registro eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    }
  };
  
  module.exports = {
    createExpenseCategory,
    getAllExpenseCategorys,
    getExpenseCategoryById,
    updateExpenseCategory,
    deleteExpenseCategory,
  };
  