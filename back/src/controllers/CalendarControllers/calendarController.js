// controllers/calendarController.js
const { google } = require('googleapis');
const key = require('../../../cashin-435921-332a48bb414b.json'); // Cambia a la ruta correcta

// Crear un cliente JWT con las credenciales de la cuenta de servicio
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/calendar'],
  'cashin@cashin-435921.iam.gserviceaccount.com' // Cambia al email de Persona1
);

// Obtener eventos del calendario
const getEvents = async (req, res) => {
    try {
        await jwtClient.authorize();
    
        const calendar = google.calendar('v3');
        const calendarId = 'gonza.cay@gmail.com'; // Reemplaza con el ID de tu calendario "Gonzalo Cayssials"
        
        const response = await calendar.events.list({
          auth: jwtClient,
          calendarId: calendarId,
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
        });
    
        const events = response.data.items;
        if (events.length) {
          res.json(events);
        } else {
          res.status(404).send('No se encontraron eventos.');
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).send('Error al obtener eventos del calendario.');
      }
    };

    const createEvent = async (req, res) => {
      try {
        // Autorizar el cliente JWT
        await jwtClient.authorize();
    
        const calendar = google.calendar('v3');
        const calendarId = 'gonza.cay@gmail.com'; // ID del calendario, puede ser dinámico si se requiere
    
        // Extraer los datos del cuerpo de la petición
        const {
          summary,
          location,
          description,
          startDateTime,
          endDateTime,
          timeZone = 'America/Argentina/Buenos_Aires', // Zona horaria por defecto a GMT-3
          attendees = [], // Invitados, vacío si no hay
        } = req.body;
    
        // Datos del evento
        const event = {
          summary: summary || 'Evento sin título', // Título del evento
          location: location || 'Ubicación no especificada', // Ubicación
          description: description || '', // Descripción
          start: {
            dateTime: startDateTime, // Fecha y hora de inicio
            timeZone: timeZone, // Zona horaria que puede ser personalizada
          },
          end: {
            dateTime: endDateTime, // Fecha y hora de finalización
            timeZone: timeZone, // Zona horaria que puede ser personalizada
          },
          attendees: attendees.length > 0 ? attendees.map(email => ({ email })) : [], // Si hay invitados, los agrega
          reminders: {
            useDefault: false, // Siempre fija los recordatorios
            overrides: [
              { method: 'email', minutes: 24 * 60 }, // Recordatorio por correo 24 horas antes
              { method: 'popup', minutes: 10 }, // Recordatorio emergente 10 minutos antes
            ],
          },
        };
    
        // Insertar el evento en el calendario
        const response = await calendar.events.insert({
          auth: jwtClient,
          calendarId: calendarId,
          resource: event,
        });
    
        res.status(200).json({
          message: 'Evento creado exitosamente',
          event: response.data,
        });
      } catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).send('Error al crear el evento.');
      }
    };
    
    

module.exports = {
  getEvents,
  createEvent
};
