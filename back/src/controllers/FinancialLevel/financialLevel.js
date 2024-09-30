const { FinancialLevel } = require('../../models/index');

// Crear un nuevo FinancialLevel
const createFinancialLevel = async (req, res) => {
  try {
    const { data_id, financialLevel } = req.body;
    const newFinancialLevel = await FinancialLevel.create({ data_id, financialLevel });
    return res.status(201).json(newFinancialLevel);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando FinancialLevel' });
  }
};

// Obtener todos los FinancialLevels
const getAllFinancialLevels = async (req, res) => {
  try {
    const financialLevels = await FinancialLevel.findAll();
    return res.status(200).json(financialLevels);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo FinancialLevels' });
  }
};

// Obtener un FinancialLevel por ID
const getFinancialLevelById = async (req, res) => {
  try {
    const { id } = req.params;
    const financialLevel = await FinancialLevel.findByPk(id);
    if (!financialLevel) {
      return res.status(404).json({ error: 'FinancialLevel no encontrado' });
    }
    return res.status(200).json(financialLevel);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo FinancialLevel' });
  }
};

// Actualizar un FinancialLevel por ID
const updateFinancialLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { data_id, financialLevel } = req.body;

    const existingFinancialLevel = await FinancialLevel.findByPk(id);
    if (!existingFinancialLevel) {
      return res.status(404).json({ error: 'FinancialLevel no encontrado' });
    }

    existingFinancialLevel.data_id = data_id;
    existingFinancialLevel.financialLevel = financialLevel;

    await existingFinancialLevel.save();
    return res.status(200).json(existingFinancialLevel);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando FinancialLevel' });
  }
};

// Eliminar un FinancialLevel por ID
const deleteFinancialLevel = async (req, res) => {
  try {
    const { id } = req.params;

    const financialLevel = await FinancialLevel.findByPk(id);
    if (!financialLevel) {
      return res.status(404).json({ error: 'FinancialLevel no encontrado' });
    }

    await financialLevel.destroy();
    return res.status(200).json({ message: 'FinancialLevel eliminado con éxito' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando FinancialLevel' });
  }
};

module.exports = {
  createFinancialLevel,
  getAllFinancialLevels,
  getFinancialLevelById,
  updateFinancialLevel,
  deleteFinancialLevel,
};
