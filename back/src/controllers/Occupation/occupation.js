const { Occupation } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla Occupation
const createOccupation = async (req, res) => {
  try {
    const { occupation } = req.body;

    if (!occupation) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newOccupation = await Occupation.create({ occupation });
    res.status(201).json(newOccupation);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Occupation
const getAllOccupations = async (req, res) => {
  try {
    const occupations = await Occupation.findAll();
    res.status(200).json(occupations);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getOccupationById = async (req, res) => {
  try {
    const { id } = req.params;
    const occupation = await Occupation.findByPk(id);

    if (!occupation) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(occupation);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateOccupation = async (req, res) => {
  try {
    const { id } = req.params;
    const { occupation } = req.body;

    if (!occupation) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingOccupation = await Occupation.findByPk(id);

    if (!existingOccupation) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingOccupation.update({ occupation });
    res.status(200).json(existingOccupation);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteOccupation = async (req, res) => {
  try {
    const { id } = req.params;
    const occupation = await Occupation.findByPk(id);

    if (!occupation) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await occupation.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createOccupation,
  getAllOccupations,
  getOccupationById,
  updateOccupation,
  deleteOccupation
};
