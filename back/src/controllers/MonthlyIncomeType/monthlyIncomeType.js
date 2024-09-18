const { MonthlyIncomeType } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla MonthlyIncomeType
const createMonthlyIncomeType = async (req, res) => {
  try {
    const { monthly_income } = req.body;

    if (!monthly_income) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newMonthlyIncomeType = await MonthlyIncomeType.create({ monthly_income });
    res.status(201).json(newMonthlyIncomeType);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla MonthlyIncomeType
const getAllMonthlyIncomeTypes = async (req, res) => {
  try {
    const monthlyIncomeTypes = await MonthlyIncomeType.findAll();
    res.status(200).json(monthlyIncomeTypes);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getMonthlyIncomeTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const monthlyIncomeType = await MonthlyIncomeType.findByPk(id);

    if (!monthlyIncomeType) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(monthlyIncomeType);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateMonthlyIncomeType = async (req, res) => {
  try {
    const { id } = req.params;
    const { monthly_income } = req.body;

    if (!monthly_income) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingMonthlyIncomeType = await MonthlyIncomeType.findByPk(id);

    if (!existingMonthlyIncomeType) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingMonthlyIncomeType.update({ monthly_income });
    res.status(200).json(existingMonthlyIncomeType);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteMonthlyIncomeType = async (req, res) => {
  try {
    const { id } = req.params;
    const monthlyIncomeType = await MonthlyIncomeType.findByPk(id);

    if (!monthlyIncomeType) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await monthlyIncomeType.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createMonthlyIncomeType,
  getAllMonthlyIncomeTypes,
  getMonthlyIncomeTypeById,
  updateMonthlyIncomeType,
  deleteMonthlyIncomeType
};
