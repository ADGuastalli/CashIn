const { Income } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla Income
const createIncome = async (req, res) => {
  try {
    const { monthly_income_id, income, mount, date } = req.body;

    if (monthly_income_id == null || income == null || mount == null || date == null) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newIncome = await Income.create({ monthly_income_id, income, mount, date });
    res.status(201).json(newIncome);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Income
const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.findAll();
    res.status(200).json(incomes);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findByPk(id);

    if (!income) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(income);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { monthly_income_id, income, mount, date } = req.body;

    if (monthly_income_id == null || income == null || mount == null || date == null) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingIncome = await Income.findByPk(id);

    if (!existingIncome) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingIncome.update({ monthly_income_id, income, mount, date });
    res.status(200).json(existingIncome);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findByPk(id);

    if (!income) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await income.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome
};
