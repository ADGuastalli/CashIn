const { DebtCategory } = require('../../models/index');  // Importar el modelo DebtCategory

// CREATE: Crear un nuevo registro en la tabla DebtCategory
const createDebtCategory = async (req, res) => {
  try {
    const { debt } = req.body;

    if (!debt) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newDebtCategory = await DebtCategory.create({ debt });
    res.status(201).json(newDebtCategory);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla DebtCategory
const getAllDebtCategories = async (req, res) => {
  try {
    const debtCategories = await DebtCategory.findAll();
    res.status(200).json(debtCategories);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getDebtCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const debtCategory = await DebtCategory.findByPk(id);

    if (!debtCategory) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(debtCategory);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateDebtCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { debt } = req.body;

    if (!debt) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingDebtCategory = await DebtCategory.findByPk(id);

    if (!existingDebtCategory) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingDebtCategory.update({ debt });
    res.status(200).json(existingDebtCategory);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteDebtCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const debtCategory = await DebtCategory.findByPk(id);

    if (!debtCategory) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await debtCategory.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createDebtCategory,
  getAllDebtCategories,
  getDebtCategoryById,
  updateDebtCategory,
  deleteDebtCategory
};
