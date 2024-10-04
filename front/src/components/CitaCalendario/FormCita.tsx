"use client";
import React, { useState, useEffect } from "react";
import { API } from "@/helpers/helper";
import { Input_profile } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button_actions } from "../ui/Buttons";
import { useRouter } from "next/navigation";

const CreateEventForm = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState({
    summary: "",
    location: "Meet / Zoom", // La ubicación está establecida y no se puede cambiar
    description: "",
    startDateTime: "",
    endDateTime: "",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  const [availableSlots, setAvailableSlots] = useState<
    {
      slot_id: string;
      start_time: string;
      end_time: string;
      reserved: boolean;
    }[]
  >([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(`${API}/available-slots`);
      if (response.ok) {
        const data = await response.json();
        console.log("Citas:", data);
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

  const handleSlotClick = (slot_id: string) => {
    const selected = availableSlots.find((slot) => slot.slot_id === slot_id);
    if (selected) {
      setEventData((prevData) => ({
        ...prevData,
        startDateTime: new Date(selected.start_time).toISOString(),
        endDateTime: new Date(selected.end_time).toISOString(),
      }));
      setSelectedSlot(slot_id);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos del evento:", eventData);

    try {
      const response = await fetch(`${API}/create-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData), // Usa eventData tal cual, ya está formateado
      });

      const data = await response.json();
      console.log("Respuesta del back:", data);

      if (response.ok) {
        alert("Evento creado exitosamente!");
        router.push("/Menu");
      } else {
        alert("Error al crear el evento.");
      }
    } catch (error) {
      alert("Error en la solicitud.");
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
        <Label>Citas disponibles:</Label>
        <ul>
          {availableSlots
            .sort(
              (a, b) =>
                new Date(a.start_time).getTime() -
                new Date(b.start_time).getTime()
            )
            .map((slot) => (
              <li
                key={slot.slot_id}
                className={`mb-2 flex justify-between items-center bg-gray-200 py-2 px-5 rounded-lg ${
                  selectedSlot === slot.slot_id ? "bg-green-200" : ""
                }`}
              >
                {`Inicio: ${new Date(
                  slot.start_time
                ).toLocaleString()} - Fin: ${new Date(
                  slot.end_time
                ).toLocaleString()}`}
                <button
                  onClick={() => handleSlotClick(slot.slot_id)}
                  className="bg-blue-500 hover:bg-blue-600 ml-10 text-white font-bold py-1 px-3 rounded"
                >
                  Seleccionar
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-5">
        <Label>
          Fecha y hora de inicio:
          <Input_profile
            type="datetime-local"
            name="startDateTime"
            value={eventData.startDateTime.slice(0, 16)} // Asegúrate de que el formato sea correcto para el input
            onChange={handleInputChange}
            readOnly // Desactiva el campo para la edición
            required
          />
        </Label>
      </div>

      <div className="mt-5">
        <Label>
          Fecha y hora de finalización:
          <Input_profile
            type="datetime-local"
            name="endDateTime"
            value={eventData.endDateTime.slice(0, 16)} // Asegúrate de que el formato sea correcto para el input
            onChange={handleInputChange}
            readOnly // Desactiva el campo para la edición
            required
          />
        </Label>
      </div>
      <div className="mt-20 flex justify-center">
        <Button_actions type="submit">Crear Cita</Button_actions>
      </div>
    </form>
  );
};

export default CreateEventForm;
