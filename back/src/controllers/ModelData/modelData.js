const { ModelData } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla ModelData
const createModelData = async (req, res) => {
  try {
    const { data1, data2, data3 } = req.body;

    const newModelData = await ModelData.create({ data1, data2, data3 });
    res.status(201).json(newModelData);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla ModelData
const getAllModelData = async (req, res) => {
  try {
    const modelData = await ModelData.findAll();
    res.status(200).json(modelData);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getModelDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const modelData = await ModelData.findByPk(id);

    if (!modelData) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(modelData);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateModelData = async (req, res) => {
  try {
    const { id } = req.params;
    const { data1, data2, data3 } = req.body;

    const existingModelData = await ModelData.findByPk(id);

    if (!existingModelData) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingModelData.update({ data1, data2, data3 });
    res.status(200).json(existingModelData);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteModelData = async (req, res) => {
  try {
    const { id } = req.params;
    const modelData = await ModelData.findByPk(id);

    if (!modelData) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await modelData.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createModelData,
  getAllModelData,
  getModelDataById,
  updateModelData,
  deleteModelData
};
