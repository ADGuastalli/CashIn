const { DataService } = require("../../models/index");

const getAllDataServices = async (req, res) => {
  try {
    const dataServices = await DataService.findAll();
    res.status(200).json(dataServices);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los servicios de datos" });
  }
};

const getDataServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const dataService = await DataService.findByPk(id);
    if (!dataService)
      return res.status(404).json({ error: "Servicio de datos no encontrado" });
    res.status(200).json(dataService);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el servicio de datos" });
  }
};

const createDataService = async (req, res) => {
  const {
    name,
    service_id,
    country_id,
    bank_id,
    secuence,
    opening_amount,
    interest_rate,
    requeriment,
    benefit_offered,
    trade_name,
  } = req.body;

  try {
    const newDataService = await DataService.create({
      name,
      service_id,
      country_id,
      bank_id,
      secuence,
      opening_amount,
      interest_rate,
      requeriment,
      benefit_offered,
      trade_name,
    });
    res.status(201).json(newDataService);
  } catch (error) {
    console.error("Error al crear el servicio de datos:", error); // Imprime el error en la consola

    // Si el error tiene detalles específicos, los incluimos en la respuesta
    const errorDetails = error.errors?.map((err) => err.message) || [
      error.message,
    ];

    res.status(500).json({
      error: "Error al crear el servicio de datos",
      message: errorDetails,
    });
  }
};

const updateDataService = async (req, res) => {
  const { id } = req.params;
  const { name, service_id, country_id, bank_id } = req.body;
  try {
    const dataService = await DataService.findByPk(id);
    if (!dataService)
      return res.status(404).json({ error: "Servicio de datos no encontrado" });

    dataService.name = name;
    dataService.service_id = service_id;
    dataService.country_id = country_id;
    dataService.bank_id = bank_id;
    await dataService.save();
    res.status(200).json(dataService);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el servicio de datos" });
  }
};

const deleteDataService = async (req, res) => {
  const { id } = req.params;
  try {
    const dataService = await DataService.findByPk(id);
    if (!dataService)
      return res.status(404).json({ error: "Servicio de datos no encontrado" });

    await dataService.destroy();
    res
      .status(200)
      .json({ mensaje: "Servicio de datos eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el servicio de datos" });
  }
};

module.exports = {
  getAllDataServices,
  getDataServiceById,
  createDataService,
  updateDataService,
  deleteDataService,
};
