const { Service } = require('../../models/index');

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
};

const createService = async (req, res) => {
  const { name } = req.body;
  try {
    const newService = await Service.create({ name });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el servicio' });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });

    service.name = name;
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });

    await service.destroy();
    res.status(200).json({ mensaje: 'Servicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
