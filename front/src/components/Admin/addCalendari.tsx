"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { API } from "@/helpers/helper";

interface Slot {
  slot_id: string;
  start_time: string;
  end_time: string;
  reserved: boolean;
}

const AdminAvailabilityForm = () => {
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [reservedSlots, setReservedSlots] = useState<Slot[]>([]);
  const [newSlot, setNewSlot] = useState<{
    startTime: string;
    endTime: string;
  }>({
    startTime: "",
    endTime: "",
  });

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(`${API}/available-slots`);
      if (!response.ok)
        throw new Error("Error al obtener los slots disponibles");
      const slots: Slot[] = await response.json();
      console.log("Slots recibidos:", slots);
      setAvailableSlots(slots);
    } catch (error) {
      handleError("Error al obtener los slots disponibles", error);
    }
  };

  const fetchReservedSlots = async () => {
    try {
      const response = await fetch(`${API}/getReservedSlot`);
      if (!response.ok)
        throw new Error("Error al obtener los slots reservados");
      const slots: Slot[] = await response.json();
      console.log("Slots reservados:", slots);
      setReservedSlots(slots);
    } catch (error) {
      handleError("Error al obtener los slots reservados", error);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
    fetchReservedSlots(); // Llama a la función para obtener los slots reservados
  }, []);

  const handleError = (message: string, error: unknown) => {
    console.error(message, error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  const handleAddSlot = async () => {
    const { startTime, endTime } = newSlot;

    console.log(newSlot);

    if (startTime && endTime) {
      try {
        const response = await fetch(`${API}/create-slot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start_time: startTime, // Asegúrate de que el backend espera estas claves
            end_time: endTime,
          }),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Slot creado y guardado correctamente.",
          });
          fetchAvailableSlots();
          fetchReservedSlots(); // Refrescar los slots reservados
          setNewSlot({ startTime: "", endTime: "" });
        } else {
          throw new Error("Error al crear el slot");
        }
      } catch (error) {
        handleError("Error al crear el slot", error);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete ambos campos.",
      });
    }
  };

  const handleRemoveSlot = async (slotId: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto después de eliminar el slot.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API}/delete-slot`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slotId }),
        });

        if (response.ok) {
          setAvailableSlots((prevSlots) =>
            prevSlots.filter((slot) => slot.slot_id !== slotId)
          );
          // También puedes eliminar el slot de reservedSlots si corresponde
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Slot eliminado correctamente.",
          });
        } else {
          throw new Error("Error al eliminar el slot");
        }
      } catch (error) {
        handleError("Error al eliminar el slot", error);
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Cancelado",
        text: "La eliminación del slot ha sido cancelada.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/update-availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availableSlots }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Disponibilidad actualizada correctamente!",
        });
        fetchAvailableSlots();
      } else {
        throw new Error("Error al actualizar la disponibilidad");
      }
    } catch (error) {
      handleError("Error al actualizar la disponibilidad", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center">Reserva de Citas</h1>
        <p className="mx-20 my-20 text-center ">
          “Para registrar una cita, debes hacerlo el día siguiente al dia en el
          que nos encontramos. Las citas no reservados que hayan vencido se
          eliminarán automáticamente.”
        </p>
        <h2 className="text-xl font-bold mb-4">Agregar Nueva Disponibilidad</h2>
        <div className="mb-4">
          <label htmlFor="start" className="text-lg mr-5">
            Fecha y Hora de Inicio:
          </label>
          <input
            type="datetime-local"
            id="start"
            value={newSlot.startTime}
            onChange={(e) =>
              setNewSlot({ ...newSlot, startTime: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end" className="text-lg mr-5">
            Fecha y Hora de Fin:
          </label>
          <input
            type="datetime-local"
            id="end"
            value={newSlot.endTime}
            onChange={(e) =>
              setNewSlot({ ...newSlot, endTime: e.target.value })
            }
            required
          />
        </div>
        <button
          type="button"
          onClick={handleAddSlot}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Cita
        </button>
      </form>
      <h3 className="text-xl font-bold mb-4 mt-10">Citas Disponibles:</h3>
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
              className="mb-2 flex justify-between items-center bg-gray-200 py-2 px-5 rounded-lg"
            >
              {`Inicio: ${new Date(
                slot.start_time
              ).toLocaleString()} - Fin: ${new Date(
                slot.end_time
              ).toLocaleString()}`}
              <button
                onClick={() => handleRemoveSlot(slot.slot_id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Eliminar
              </button>
            </li>
          ))}
      </ul>
      <h2 className="text-xl font-bold mb-4 mt-10">
        Citas Reservadas por usuarios:
      </h2>
      <ul>
        {reservedSlots
          .sort(
            (a, b) =>
              new Date(a.start_time).getTime() -
              new Date(b.start_time).getTime()
          )
          .map((slot) => (
            <li
              key={slot.slot_id}
              className="mb-2 flex justify-between items-center bg-gray-300 py-2 px-5 rounded-lg"
            >
              {`Inicio: ${new Date(
                slot.start_time
              ).toLocaleString()} - Fin: ${new Date(
                slot.end_time
              ).toLocaleString()}`}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AdminAvailabilityForm;
