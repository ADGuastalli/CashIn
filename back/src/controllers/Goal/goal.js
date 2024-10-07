const { Goal , User, Data} = require('../../models/index');

function convertDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Los meses en JavaScript son 0-indexados
}

// CREATE: Crear un nuevo registro en la tabla Goal
const createGoal = async (req, res) => {
  try {
    const { goal, mount, date ,percentage, time_months, user_id} = req.body;

    if (goal === undefined || mount === undefined || date === undefined || user_id === undefined || percentage == undefined || time_months === undefined) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const formattedDate = convertDate(date);

    const userdata =  await User.findOne({
      where: {user_id},
      include: [{
        model: Data,
        attributes: ['data_id']
      }]
    })

    const data_id = userdata.Datum.data_id

    const newGoal = await Goal.create({ goal, mount, date: formattedDate, percentage, time_months, data_id });
    res.status(201).json(newGoal);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Goal
const getAllGoals = async (req, res) => {
  const { id } = req.params;
  try {
    const userWithGoals = await User.findOne({
      where: { user_id: id },  
      include: {
        model: Data,           
        include: {
          model: Goal,       
        }
      }
    });

    if (!userWithGoals) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (userWithGoals.Datum !== null && userWithGoals.Datum.Goal !== undefined){
      const goals = userWithGoals.Datum.Goal;
      const mapGoals = goals.map(goal => {
        return{
          goal_id: goal.goal_id,
          goal: goal.goal,
          mount: goal.mount,
          time_months: goal.time_months,
          percentage: goal.percentage,
          date: goal.date,
        }
      })
      res.status(200).json(mapGoals);
    }else{
      res.status(200).json([]);
    }
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
