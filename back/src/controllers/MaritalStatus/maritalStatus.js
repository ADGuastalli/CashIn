const { MaritalStatus } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla MaritalStatus
const createMaritalStatus = async (req, res) => {
  try {
    const { marital_status } = req.body;

    if (!marital_status) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newMaritalStatus = await MaritalStatus.create({ marital_status });
    res.status(201).json(newMaritalStatus);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla MaritalStatus
const getAllMaritalStatuses = async (req, res) => {
  try {
    const maritalStatuses = await MaritalStatus.findAll();
    res.status(200).json(maritalStatuses);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getMaritalStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const maritalStatus = await MaritalStatus.findByPk(id);

    if (!maritalStatus) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(maritalStatus);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateMaritalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { marital_status } = req.body;

    if (!marital_status) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingMaritalStatus = await MaritalStatus.findByPk(id);

    if (!existingMaritalStatus) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingMaritalStatus.update({ marital_status });
    res.status(200).json(existingMaritalStatus);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteMaritalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const maritalStatus = await MaritalStatus.findByPk(id);

    if (!maritalStatus) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await maritalStatus.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createMaritalStatus,
  getAllMaritalStatuses,
  getMaritalStatusById,
  updateMaritalStatus,
  deleteMaritalStatus
};
