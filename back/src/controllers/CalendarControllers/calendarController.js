const { google } = require("googleapis");
const key = require("../../../cashin-435921-332a48bb414b.json"); // Cambia a la ruta correcta
const { Op } = require("sequelize");
const { SlotModel } = require("../../models/index"); // Asegúrate de tener el modelo correctamente definido
const cron = require("node-cron");
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/calendar"],
  "cashin@cashin-435921.iam.gserviceaccount.com"
);

// Función para crear un evento (para usuarios comunes)
const createEvent = async (req, res) => {
  const { summary, startDateTime, endDateTime } = req.body;

  try {
    // Autoriza el cliente JWT para acceder al calendario
    await jwtClient.authorize();
    const calendar = google.calendar("v3");
    const calendarId = "gonza.cay@gmail.com";

    const event = {
      summary: summary,
      start: {
        dateTime: new Date(startDateTime).toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      end: {
        dateTime: new Date(endDateTime).toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
    };

    // Crea el evento en Google Calendar
    await calendar.events.insert({
      auth: jwtClient,
      calendarId: calendarId,
      resource: event,
    });

    // Aquí debes buscar el slot correspondiente al evento
    const slot = await SlotModel.findOne({
      where: {
        start_time: {
          [Op.lt]: endDateTime,
        },
        end_time: {
          [Op.gt]: startDateTime,
        },
        reserved: false, // Solo busca slots que no están reservados
      },
    });

    // Si se encuentra un slot, actualiza su estado a reservado
    if (slot) {
      slot.reserved = true; // Cambia el estado a reservado
      await slot.save(); // Guarda los cambios en la base de datos
    } else {
      return res
        .status(404)
        .json({ message: "No se encontró un slot disponible para el evento." });
    }

    res.status(201).json({ message: "Evento creado exitosamente", event });
  } catch (error) {
    console.error("Error al crear el evento:", error);
    res.status(500).json({ message: "Error al crear el evento", error });
  }
};

// Función para crear un slot (solo para admins)
const createSlot = async (req, res) => {
  const { start_time, end_time } = req.body;

  console.log("Datos recibidos para crear slot:", start_time, end_time);

  // Validar que los valores existan y sean correctos
  if (!start_time || !end_time) {
    return res.status(400).json({
      message: "Por favor, proporciona las fechas y horas de inicio y fin.",
    });
  }

  // Convertir las fechas a objetos Date
  const start = new Date(start_time);
  const end = new Date(end_time);
  const now = new Date();

  // Validar que las fechas sean futuras y válidas
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: "Fecha inválida proporcionada." });
  }

  if (start <= now) {
    return res.status(400).json({
      message: "El slot debe ser para una fecha futura.",
    });
  }

  if (start >= end) {
    return res.status(400).json({
      message: "La fecha de inicio debe ser anterior a la fecha de fin.",
    });
  }

  try {
    // Autoriza el cliente JWT para acceder a Google Calendar
    await jwtClient.authorize();
    const calendar = google.calendar("v3");
    const calendarId = "gonza.cay@gmail.com"; // Reemplaza con el ID de tu calendario

    // Crear el evento en Google Calendar
    const event = {
      summary: "Slot disponible",
      start: {
        dateTime: start.toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
    };

    await calendar.events.insert({
      auth: jwtClient,
      calendarId: calendarId,
      resource: event,
    });

    // Crear el slot en la base de datos
    const newSlot = await SlotModel.create({
      start_time: start,
      end_time: end,
      reserved: false, // Por defecto, el slot no está reservado
    });

    res.status(201).json({
      message: "Slot creado exitosamente",
      slot: newSlot,
    });
  } catch (error) {
    console.error("Error al crear el slot:", error);
    res.status(500).json({
      message: "Error al crear el slot",
      error: error.message,
    });
  }
};

// Función para obtener eventos del calendario
const getEvents = async (req, res) => {
  try {
    await jwtClient.authorize();

    const calendar = google.calendar("v3");
    const calendarId = "gonza.cay@gmail.com"; // Reemplaza con el ID de tu calendario "Gonzalo Cayssials"

    const response = await calendar.events.list({
      auth: jwtClient,
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items;
    if (events.length) {
      res.json(events);
    } else {
      res.status(404).send("No se encontraron eventos.");
    }
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).send("Error al obtener eventos del calendario.");
  }
};

// Función para obtener slots disponibles de la base de datos
const getAvailableSlots = async (req, res) => {
  const now = new Date();

  try {
    const availableSlots = await SlotModel.findAll({
      where: {
        start_time: { [Op.gt]: now }, // Solo slots futuros
        reserved: false, // Solo no reservados
      },
      order: [["start_time", "ASC"]], // Ordenar por fecha de inicio
    });

    res.status(200).json(availableSlots);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los slots disponibles", error });
  }
};

const getReservedSlots = async (req, res) => {
  const now = new Date();

  try {
    const availableSlots = await SlotModel.findAll({
      where: {
        start_time: { [Op.gt]: now }, // Solo slots futuros
        reserved: true, // Solo no reservados
      },
      order: [["start_time", "ASC"]], // Ordenar por fecha de inicio
    });

    res.status(200).json(availableSlots);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los slots disponibles", error });
  }
};

// Función para reservar un slot
const reserveSlot = async (req, res) => {
  const { slotId } = req.body;

  try {
    const slot = await SlotModel.findOne({ where: { id: slotId } });

    if (!slot) {
      return res.status(404).json({ message: "Slot no encontrado." });
    }

    if (slot.reserved) {
      return res.status(400).json({ message: "El slot ya está reservado." });
    }

    slot.reserved = true;
    await slot.save();

    res.status(200).json({ message: "Slot reservado exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al reservar el slot", error });
  }
};

// Función para eliminar slots pasados no reservados
const deletePastUnreservedSlots = async (req, res) => {
  const now = new Date();

  try {
    const result = await SlotModel.destroy({
      where: {
        end_time: { [Op.lt]: now }, // Menor que la fecha actual
        reserved: false, // No reservados
      },
    });

    res.status(200).json({
      message: `Se eliminaron ${result} slots no reservados que ya pasaron.`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar slots no reservados", error });
  }
};

// Tarea programada con node-cron para eliminar automáticamente slots pasados no reservados
cron.schedule("0 0 * * *", () => {
  deletePastUnreservedSlots();
});

// Función para eliminar un slot
const deleteSlot = async (req, res) => {
  const { slotId } = req.body;
  console.log(slotId);

  try {
    const result = await SlotModel.destroy({
      where: { slot_id: slotId }, // Usa id que es la clave primaria en tu modelo
    });

    if (result === 0) {
      return res.status(404).json({ message: "Slot no encontrado." });
    }

    res.status(200).json({ message: "Slot eliminado exitosamente." });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error al eliminar el slot", error });
  }
};

// Exportar las funciones del controlador para usarlas en las rutas
module.exports = {
  createEvent,
  createSlot,
  getEvents,
  getAvailableSlots,
  reserveSlot,
  deletePastUnreservedSlots,
  deleteSlot,
  getReservedSlots,
};
