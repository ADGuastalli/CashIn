"use client";
import React, { useEffect, useState } from "react";
import { API } from "@/helpers/helper";

interface Event {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API}/events`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Error al obtener los eventos");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Eventos</h2>
      {events.length === 0 ? (
        <p>No hay eventos.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.summary}</strong> <br />
              {new Date(event.start.dateTime).toLocaleString()} -{" "}
              {new Date(event.end.dateTime).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
