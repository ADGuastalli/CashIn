const { Saving } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla Saving
const createSaving = async (req, res) => {
  try {
    const { saving, mount, date, data_id } = req.body;

    if (saving == null || mount == null || date == null || data_id == null) {
      return res.status(400).json({ error: 'Todos los campos (saving, mount, date, data_id) son requeridos' });
    }

    const newSaving = await Saving.create({
      saving,
      mount,
      date,
      data_id 
    });
    res.status(201).json(newSaving);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Saving
const getAllSavings = async (req, res) => {
  try {
    const savings = await Saving.findAll();
    res.status(200).json(savings);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getSavingById = async (req, res) => {
  try {
    const { id } = req.params;
    const saving = await Saving.findByPk(id);

    if (!saving) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(saving);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const { saving, mount, date } = req.body;

    if (saving == null || mount == null || date == null) {
      return res.status(400).json({ error: 'Todos los campos (saving, mount, date) son requeridos' });
    }

    const existingSaving = await Saving.findByPk(id);

    if (!existingSaving) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingSaving.update({ saving, mount, date });
    res.status(200).json(existingSaving);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const saving = await Saving.findByPk(id);

    if (!saving) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await saving.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createSaving,
  getAllSavings,
  getSavingById,
  updateSaving,
  deleteSaving
};
