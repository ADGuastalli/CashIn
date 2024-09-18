const { GoalCategory } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla GoalCategory
const createGoalCategory = async (req, res) => {
  try {
    const { goal_category } = req.body;

    if (!goal_category) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newGoalCategory = await GoalCategory.create({ goal_category });
    res.status(201).json(newGoalCategory);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla GoalCategory
const getAllGoalCategories = async (req, res) => {
  try {
    const goalCategories = await GoalCategory.findAll();
    res.status(200).json(goalCategories);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getGoalCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const goalCategory = await GoalCategory.findByPk(id);

    if (!goalCategory) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(goalCategory);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateGoalCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { goal_category } = req.body;

    if (!goal_category) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingGoalCategory = await GoalCategory.findByPk(id);

    if (!existingGoalCategory) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingGoalCategory.update({ goal_category });
    res.status(200).json(existingGoalCategory);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteGoalCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const goalCategory = await GoalCategory.findByPk(id);

    if (!goalCategory) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await goalCategory.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createGoalCategory,
  getAllGoalCategories,
  getGoalCategoryById,
  updateGoalCategory,
  deleteGoalCategory
};
