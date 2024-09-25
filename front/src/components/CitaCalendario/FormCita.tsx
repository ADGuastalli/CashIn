"use client";
import React, { useState, useEffect } from "react";
import { API } from "@/helpers/helper";
import { Input_profile } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button_actions } from "../ui/Buttons";
import Swal from "sweetalert2";

const CreateEventForm = () => {
  const [eventData, setEventData] = useState({
    summary: "",
    location: "Meet / Zoom",
    description: "",
    startDateTime: "",
    endDateTime: "",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  const [availableSlots, setAvailableSlots] = useState<{ start: string }[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Actualizar el valor de startDateTime
    setEventData((prevData) => {
      // Calcular la nueva fecha de finalización sumando una hora a la de inicio
      const startDate = new Date(value);
      const endDate = new Date(startDate.getTime() - 60 * 60 * 2000); // Sumar 1 hora

      return {
        ...prevData,
        [name]: value,
        endDateTime: endDate.toISOString().slice(0, 16), // Formatear para datetime-local
      };
    });
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(`${API}/available-slots`);
      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data);
      } else {
        console.error("Error al obtener los slots disponibles");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos del evento:", eventData);

    const updatedEventData = {
      ...eventData,
      startDateTime: new Date(eventData.startDateTime).toISOString(),
      endDateTime: new Date(eventData.endDateTime).toISOString(),
    };

    try {
      const response = await fetch(`${API}/create-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEventData),
      });

      const data = await response.json();
      console.log("respuesta del back", data);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Evento creado exitosamente!",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al crear el evento.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error en la solicitud.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Título del evento:
        <Input_profile
          type="text"
          name="summary"
          value={eventData.summary}
          onChange={handleInputChange}
          required
        />
      </Label>

      <Label>
        Ubicación:
        <Input_profile
          type="text"
          name="location"
          value={eventData.location}
          readOnly
        />
      </Label>

      <Label>
        Descripción:
        <textarea
          name="description"
          value={eventData.description}
          placeholder="Por favor ingresar los motivos de la consulta y un Email para su contacto. Muchas gracias"
          onChange={handleInputChange}
          style={{
            display: "block",
            marginTop: "5px",
            width: "100%",
            height: "100px",
            border: "1px solid black",
            borderRadius: "4px",
            padding: "5px",
          }}
        />
      </Label>
      <div className="mt-5">
        <Label>
          Fecha y hora de inicio:
          <select
            name="startDateTime"
            value={eventData.startDateTime}
            onChange={handleSelectChange}
            required
          >
            <option value="">Selecciona un horario</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot.start}>
                {new Date(slot.start).toLocaleString()}
              </option>
            ))}
          </select>
        </Label>
      </div>
      <div className="mt-5">
        <Label>
          Fecha y hora de finalización:
          <Input_profile
            type="datetime-local"
            name="endDateTime"
            value={eventData.endDateTime}
            onChange={handleInputChange}
            disabled // Desactiva el campo para la edición
            required
          />
        </Label>
      </div>

      <Button_actions type="submit">Crear evento</Button_actions>
    </form>
  );
};

export default CreateEventForm;
