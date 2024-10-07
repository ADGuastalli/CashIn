const { PersonalProperty, Data, PersonalPropertyType, User } = require('../../models/index');

function convertDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Los meses en JavaScript son 0-indexados
}
// CREATE: Crear un nuevo registro en la tabla PersonalProperty
const createPersonalProperty = async (req, res) => {
  try {
    const { personal_property_type, personal_property, mount, date, user_id } = req.body;

    if (!personal_property_type_id || !personal_property || !mount || !date) {
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

    const personalProperty = await PersonalPropertyType.findOne({ where: { personal_property_type: personal_property_type.toLowerCase() } });
    if (!personalProperty) {
      return res.status(400).json({ error: 'Tipo de bien no encontrado' });
    }
    const personal_property_type_id = personalProperty.personal_property_type_id


    const newPersonalProperty = await PersonalProperty.create({
      personal_property_type_id,
      personal_property,
      mount,
      date:formattedDate,
      data_id
    });
    res.status(201).json(newPersonalProperty);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla PersonalProperty
const getAllPersonalProperties = async (req, res) => {
  const { id } = req.params;
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();

  try {
    const userWithPersonalProperty = await User.findOne({
      where: { user_id: id },  
      include: {
        model: Data,           
        include: {
          model: PersonalProperty,       
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), 
              [Op.lt]: new Date(currentYear, currentMonth, 1) 
            }
          }
        }
      }
    });
    if (!userWithPersonalProperty) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (userWithPersonalProperty.Datum !== null && userWithPersonalProperty.Datum.Income !== null){
      const personalProperty = userWithPersonalProperty.Datum.PersonalProperty;
      const mappedProperty = await Promise.all(personalProperty.map(async (property) => {
        const idPersonalPropertyCategory = property.personal_property_category_id;
  
        const personalPropertyCategory = await PersonalPropertyType.findByPk(idPersonalPropertyCategory)
  
        return {
          personal_property_id: property.personal_property_id,
          personal_property_type: personalPropertyCategory ? personalPropertyCategory.personal_property_type : null,
          personal_property: property.personal_property, 
          mount: property.mount, 
          date: property.date 
        };
      }));
  
      res.status(200).json(mappedProperty);
    }
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
