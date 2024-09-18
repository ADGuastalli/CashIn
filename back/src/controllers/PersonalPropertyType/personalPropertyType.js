const { PersonalPropertyType } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla PersonalPropertyType
const createPersonalPropertyType = async (req, res) => {
  try {
    const { personal_property_type } = req.body;

    if (!personal_property_type) {
      return res.status(400).json({ error: 'El campo personal_property_type es requerido' });
    }

    const newPersonalPropertyType = await PersonalPropertyType.create({
      personal_property_type
    });
    res.status(201).json(newPersonalPropertyType);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla PersonalPropertyType
const getAllPersonalPropertyTypes = async (req, res) => {
  try {
    const personalPropertyTypes = await PersonalPropertyType.findAll();
    res.status(200).json(personalPropertyTypes);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getPersonalPropertyTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const personalPropertyType = await PersonalPropertyType.findByPk(id);

    if (!personalPropertyType) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(personalPropertyType);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updatePersonalPropertyType = async (req, res) => {
  try {
    const { id } = req.params;
    const { personal_property_type } = req.body;

    if (!personal_property_type) {
      return res.status(400).json({ error: 'El campo personal_property_type es requerido' });
    }

    const existingPersonalPropertyType = await PersonalPropertyType.findByPk(id);

    if (!existingPersonalPropertyType) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingPersonalPropertyType.update({ personal_property_type });
    res.status(200).json(existingPersonalPropertyType);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deletePersonalPropertyType = async (req, res) => {
  try {
    const { id } = req.params;
    const personalPropertyType = await PersonalPropertyType.findByPk(id);

    if (!personalPropertyType) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await personalPropertyType.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createPersonalPropertyType,
  getAllPersonalPropertyTypes,
  getPersonalPropertyTypeById,
  updatePersonalPropertyType,
  deletePersonalPropertyType
};
