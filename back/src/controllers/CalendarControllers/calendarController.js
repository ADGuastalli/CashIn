// controllers/calendarController.js
const { google } = require("googleapis");
const key = require("../../../cashin-435921-332a48bb414b.json"); // Cambia a la ruta correcta

// Crear un cliente JWT con las credenciales de la cuenta de servicio
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/calendar"],
  "cashin@cashin-435921.iam.gserviceaccount.com" // Cambia al email de Persona1
);

// Obtener eventos del calendario
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

// Obtener slots disponibles para la próxima semana
// Obtener slots disponibles para la próxima semana a partir del siguiente día
// Obtener slots disponibles para la próxima semana a partir del siguiente día
const getAvailableSlots = async (req, res) => {
  try {
    await jwtClient.authorize();

    const calendar = google.calendar("v3");
    const calendarId = "gonza.cay@gmail.com"; // ID del calendario

    // Definir el rango de fechas para una semana a partir del siguiente día (lunes a viernes)
    const now = new Date();
    const startOfNextDay = new Date(now);
    startOfNextDay.setDate(now.getDate() + 1); // Día siguiente

    // Definir el final de la semana (7 días después del día siguiente)
    const endOfNextWeek = new Date(startOfNextDay);
    endOfNextWeek.setDate(startOfNextDay.getDate() + 7); // Una semana

    const response = await calendar.events.list({
      auth: jwtClient,
      calendarId: calendarId,
      timeMin: startOfNextDay.toISOString(), // Comenzar a partir del día siguiente
      timeMax: endOfNextWeek.toISOString(), // Terminar una semana después
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items;

    // Crear un array con los slots disponibles
    const timeSlots = generateTimeSlots(startOfNextDay, endOfNextWeek);

    // Rellenar los slots ocupados
    events.forEach((event) => {
      const start = new Date(event.start.dateTime);
      const end = new Date(event.end.dateTime);

      // Filtrar los slots que se superponen con los eventos ya existentes
      for (let i = 0; i < timeSlots.length; i++) {
        const slotStart = new Date(timeSlots[i].start);
        const slotEnd = new Date(timeSlots[i].end);

        // Eliminar el slot si está dentro del rango ocupado por un evento
        if (
          (slotStart >= start && slotStart < end) || // Slot empieza dentro del evento
          (slotEnd > start && slotEnd <= end) || // Slot termina dentro del evento
          (slotStart <= start && slotEnd >= end) // Evento cubre todo el slot
        ) {
          timeSlots.splice(i, 1);
          i--; // Ajustar índice después de eliminar
        }
      }
    });

    res.status(200).json(timeSlots);
  } catch (error) {
    console.error("Error al obtener slots disponibles:", error);
    res.status(500).send("Error al obtener los slots disponibles.");
  }
};

// Genera los slots de tiempo entre una fecha de inicio y una fecha de fin, excluyendo sábados y domingos
const generateTimeSlots = (startDate, endDate) => {
  const slots = [];
  const startHour = 10; // 10 am
  const endHour = 18; // 6 pm

  for (
    let day = new Date(startDate);
    day <= endDate;
    day.setDate(day.getDate() + 1)
  ) {
    const dayOfWeek = day.getDay();

    // Saltar los sábados (6) y domingos (0)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue;
    }

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        // Cada 1 hora
        slots.push({
          start: new Date(day.setHours(hour, minute, 0)).toISOString(),
          end: new Date(day.setHours(hour, minute + 60, 0)).toISOString(), // Aumentado en 60 minutos
        });
      }
    }
  }
  return slots;
};

// Crear un evento en el calendario
const createEvent = async (req, res) => {
  try {
    await jwtClient.authorize();

    const calendar = google.calendar("v3");
    const calendarId = "gonza.cay@gmail.com"; // ID del calendario

    const {
      summary,
      location,
      description,
      startDateTime,
      endDateTime,
      timeZone = "America/Argentina/Buenos_Aires",
    } = req.body;

    const startDateTimeWithTZ = new Date(startDateTime).toISOString();
    const endDateTimeWithTZ = new Date(endDateTime).toISOString();

    const event = {
      summary: summary || "Evento sin título",
      location: location || "Ubicación no especificada",
      description: description || "",
      start: {
        dateTime: startDateTimeWithTZ,
        timeZone: timeZone,
      },
      end: {
        dateTime: endDateTimeWithTZ,
        timeZone: timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    const response = await calendar.events.insert({
      auth: jwtClient,
      calendarId: calendarId,
      resource: event,
    });

    res.status(200).json({
      message: "Evento creado exitosamente",
      event: response.data,
    });
  } catch (error) {
    console.error(
      "Error al crear el evento:",
      error.response ? error.response.data : error
    );
    res.status(500).json({
      message: "Error al crear el evento.",
      error: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  getAvailableSlots,
};
