const { Dwelling } = require('../../models/index');  // Importar el modelo Dwelling

// CREATE: Crear un nuevo registro en la tabla Dwelling
const createDwelling = async (req, res) => {
  try {
    const { dwelling } = req.body;

    if (!dwelling) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newDwelling = await Dwelling.create({ dwelling });
    res.status(201).json(newDwelling);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Dwelling
const getAllDwellings = async (req, res) => {
  try {
    const dwellings = await Dwelling.findAll();
    res.status(200).json(dwellings);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getDwellingById = async (req, res) => {
  try {
    const { id } = req.params;
    const dwelling = await Dwelling.findByPk(id);

    if (!dwelling) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(dwelling);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateDwelling = async (req, res) => {
  try {
    const { id } = req.params;
    const { dwelling } = req.body;

    if (!dwelling) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingDwelling = await Dwelling.findByPk(id);

    if (!existingDwelling) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingDwelling.update({ dwelling });
    res.status(200).json(existingDwelling);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteDwelling = async (req, res) => {
  try {
    const { id } = req.params;
    const dwelling = await Dwelling.findByPk(id);

    if (!dwelling) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await dwelling.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createDwelling,
  getAllDwellings,
  getDwellingById,
  updateDwelling,
  deleteDwelling
};
