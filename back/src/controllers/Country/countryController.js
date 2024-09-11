const { Country } = require('../../models/index');

const createCountry = async (req, res) => {
  try {
    const { country } = req.body;

    if (!country) {
      return res.status(400).json({ error: 'El nombre del país es obligatorio.' });
    }

    const newCountry = await Country.create({ country });
    res.status(201).json(newCountry);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el país.' });
  }
};

const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los países.' });
  }
};

const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({ error: 'País no encontrado.' });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el país.' });
  }
};

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { country } = req.body;

    const existingCountry = await Country.findByPk(id);

    if (!existingCountry) {
      return res.status(404).json({ error: 'País no encontrado.' });
    }

    if (!country) {
      return res.status(400).json({ error: 'El nombre del país es obligatorio.' });
    }

    existingCountry.country = country;
    await existingCountry.save();

    res.status(200).json({ message: 'País actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el país.' });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({ error: 'País no encontrado.' });
    }

    await country.destroy();
    res.status(200).json({ message: 'País eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el país.' });
  }
};

module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry
};