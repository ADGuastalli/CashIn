const { Status } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla Status
const createStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (status == null) {
      return res.status(400).json({ error: 'El campo status es requerido' });
    }

    const newStatus = await Status.create({ status });
    res.status(201).json(newStatus);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Status
const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).json(statuses);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);

    if (!status) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(status);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status == null) {
      return res.status(400).json({ error: 'El campo status es requerido' });
    }

    const existingStatus = await Status.findByPk(id);

    if (!existingStatus) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingStatus.update({ status });
    res.status(200).json(existingStatus);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);

    if (!status) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await status.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  deleteStatus
};
