const { Goal } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla Goal
const createGoal = async (req, res) => {
  try {
    const { goal_category_id, goal, mount, date } = req.body;

    if (goal_category_id === undefined || goal === undefined || mount === undefined || date === undefined) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newGoal = await Goal.create({ goal_category_id, goal, mount, date });
    res.status(201).json(newGoal);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Goal
const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll();
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getGoalById = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findByPk(id);

    if (!goal) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { goal_category_id, goal, mount, date } = req.body;

    if (goal_category_id === undefined || goal === undefined || mount === undefined || date === undefined) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingGoal = await Goal.findByPk(id);

    if (!existingGoal) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingGoal.update({ goal_category_id, goal, mount, date });
    res.status(200).json(existingGoal);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findByPk(id);

    if (!goal) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await goal.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal
};
