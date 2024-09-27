const { IncomeCategory } = require('../../models/index');

// CREATE: Crear un nuevo registro en IncomeCategory
const createIncomeCategory = async (req, res) => {
  try {
    const { income_category, monthly_income } = req.body;

    if (income_category == null) {
      return res.status(400).json({ error: 'Falta el nombre de la categoría de ingresos' });
    }

    const newIncomeCategory = await IncomeCategory.create({ income_category, monthly_income });
    res.status(201).json(newIncomeCategory);
  } catch (error) {
    console.error('Error al crear la categoría de ingresos:', error);
    res.status(500).json({ error: 'Error al crear la categoría de ingresos' });
  }
};

// READ: Obtener todas las categorías de ingresos
const getAllIncomeCategories = async (req, res) => {
  try {
    const incomeCategories = await IncomeCategory.findAll();
    res.status(200).json(incomeCategories);
  } catch (error) {
    console.error('Error al obtener las categorías de ingresos:', error);
    res.status(500).json({ error: 'Error al obtener las categorías de ingresos' });
  }
};

// READ: Obtener una categoría de ingresos por ID
const getIncomeCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const incomeCategory = await IncomeCategory.findByPk(id);

    if (!incomeCategory) {
      return res.status(404).json({ error: 'Categoría de ingresos no encontrada' });
    }

    res.status(200).json(incomeCategory);
  } catch (error) {
    console.error('Error al obtener la categoría de ingresos:', error);
    res.status(500).json({ error: 'Error al obtener la categoría de ingresos' });
  }
};

// UPDATE: Actualizar una categoría de ingresos existente
const updateIncomeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { income_category, monthly_income } = req.body;

    if (income_category == null) {
      return res.status(400).json({ error: 'Falta el nombre de la categoría de ingresos' });
    }

    const incomeCategory = await IncomeCategory.findByPk(id);

    if (!incomeCategory) {
      return res.status(404).json({ error: 'Categoría de ingresos no encontrada' });
    }

    await incomeCategory.update({ income_category, monthly_income });
    res.status(200).json(incomeCategory);
  } catch (error) {
    console.error('Error al actualizar la categoría de ingresos:', error);
    res.status(500).json({ error: 'Error al actualizar la categoría de ingresos' });
  }
};

// DELETE: Eliminar una categoría de ingresos por ID
const deleteIncomeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const incomeCategory = await IncomeCategory.findByPk(id);

    if (!incomeCategory) {
      return res.status(404).json({ error: 'Categoría de ingresos no encontrada' });
    }

    await incomeCategory.destroy();
    res.status(200).json({ message: 'Categoría de ingresos eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la categoría de ingresos:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría de ingresos' });
  }
};

module.exports = {
  createIncomeCategory,
  getAllIncomeCategories,
  getIncomeCategoryById,
  updateIncomeCategory,
  deleteIncomeCategory,
};
