const { ExpenseType } = require('../../models/index');  // Importar el modelo ExpenseType

// CREATE: Crear un nuevo registro en la tabla ExpenseType
const createExpenseType = async (req, res) => {
  try {
    const { expense_type } = req.body;

    if (!expense_type) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newExpenseType = await ExpenseType.create({ expense_type });
    res.status(201).json(newExpenseType);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla ExpenseType
const getAllExpenseTypes = async (req, res) => {
    try {
      const expenseTypes = await ExpenseType.findAll();
      res.status(200).json(expenseTypes);
    } catch (error) {
      console.error('Error al obtener los registros:', error);
      res.status(500).json({ error: 'Error al obtener los registros' });
    }
  };
  
  // READ: Obtener un registro por ID
  const getExpenseTypeById = async (req, res) => {
    try {
      const { id } = req.params;
      const expenseType = await ExpenseType.findByPk(id);
  
      if (!expenseType) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
  
      res.status(200).json(expenseType);
    } catch (error) {
      console.error('Error al obtener el registro:', error);
      res.status(500).json({ error: 'Error al obtener el registro' });
    }
  };
  
  // UPDATE: Actualizar un registro existente
  const updateExpenseType = async (req, res) => {
    try {
      const { id } = req.params;
      const { expense_type } = req.body;
  
      if (!expense_type) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
      }
  
      const existingExpenseType = await ExpenseType.findByPk(id);
  
      if (!existingExpenseType) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
  
      await existingExpenseType.update({ expense_type });
      res.status(200).json(existingExpenseType);
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      res.status(500).json({ error: 'Error al actualizar el registro' });
    }
  };
  
  // DELETE: Eliminar un registro por ID
  const deleteExpenseType = async (req, res) => {
    try {
      const { id } = req.params;
      const expenseType = await ExpenseType.findByPk(id);
  
      if (!expenseType) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
  
      await expenseType.destroy();
      res.status(200).json({ message: 'Registro eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    }
  };
  
  module.exports = {
    createExpenseType,
    getAllExpenseTypes,
    getExpenseTypeById,
    updateExpenseType,
    deleteExpenseType,
  };
  