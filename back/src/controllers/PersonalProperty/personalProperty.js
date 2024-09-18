const { PersonalProperty } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla PersonalProperty
const createPersonalProperty = async (req, res) => {
  try {
    const { personal_property_type_id, personal_property, mount, date } = req.body;

    if (!personal_property_type_id || !personal_property || !mount || !date) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newPersonalProperty = await PersonalProperty.create({
      personal_property_type_id,
      personal_property,
      mount,
      date
    });
    res.status(201).json(newPersonalProperty);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla PersonalProperty
const getAllPersonalProperties = async (req, res) => {
  try {
    const personalProperties = await PersonalProperty.findAll();
    res.status(200).json(personalProperties);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getPersonalPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const personalProperty = await PersonalProperty.findByPk(id);

    if (!personalProperty) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(personalProperty);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updatePersonalProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { personal_property_type_id, personal_property, mount, date } = req.body;

    if (!personal_property_type_id || !personal_property || !mount || !date) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingPersonalProperty = await PersonalProperty.findByPk(id);

    if (!existingPersonalProperty) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingPersonalProperty.update({
      personal_property_type_id,
      personal_property,
      mount,
      date
    });
    res.status(200).json(existingPersonalProperty);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deletePersonalProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const personalProperty = await PersonalProperty.findByPk(id);

    if (!personalProperty) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await personalProperty.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createPersonalProperty,
  getAllPersonalProperties,
  getPersonalPropertyById,
  updatePersonalProperty,
  deletePersonalProperty
};
