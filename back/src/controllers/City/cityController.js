const { City } = require('../../models/index'); 

async function createCity(req, res) {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'El nombre de la ciudad es obligatorio' });
  }

  try {
    const newCity = await City.create({ city });
    return res.status(201).json(newCity);
  } catch (error) {
    console.error('Error al crear la ciudad:', error);
    return res.status(500).json({ error: 'Error al crear la ciudad' });
  }
}

async function getAllCities(req, res) {
  try {
    const cities = await City.findAll();
    return res.status(200).json(cities);
  } catch (error) {
    console.error('Error al obtener las ciudades:', error);
    return res.status(500).json({ error: 'Error al obtener las ciudades' });
  }
}

async function getCityById(req, res) {
  const { id } = req.params;

  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }
    return res.status(200).json(city);
  } catch (error) {
    console.error('Error al obtener la ciudad:', error);
    return res.status(500).json({ error: 'Error al obtener la ciudad' });
  }
}

async function updateCity(req, res) {
  const { id } = req.params;
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'El nombre de la ciudad es obligatorio' });
  }

  try {
    const updatedCity = await City.update({ city }, { where: { city_id: id } });
    if (!updatedCity[0]) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }
    return res.status(200).json({ message: 'Ciudad actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la ciudad:', error);
    return res.status(500).json({ error: 'Error al actualizar la ciudad' });
  }
}

async function deleteCity(req, res) {
  const { id } = req.params;

  try {
    const deletedCity = await City.destroy({ where: { city_id: id } });
    if (!deletedCity) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }
    return res.status(200).json({ message: 'Ciudad eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la ciudad:', error);
    return res.status(500).json({ error: 'Error al eliminar la ciudad' });
  }
}

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity
};