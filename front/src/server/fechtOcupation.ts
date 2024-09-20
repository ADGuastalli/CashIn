import { API } from "@/helpers/helper";

// Define tipos para las ocupaciones
export default interface IOccupation {
  occupation_id: number;
  occupation: string;
}

export const getAllOccupations = async (): Promise<IOccupation[]> => {
  try {
    const response = await fetch(`${API}/occupation`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener las ocupaciones");
    }

    const data: IOccupation[] = await response.json();
    console.log("Ocupaciones:", data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Cambia el tipo de occupation_id y el tipo de retorno
export const getOccupationById = async (
  occupation_id: number
): Promise<IOccupation | null | undefined> => {
  try {
    const response = await fetch(`${API}/occupation/${occupation_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener la ocupación");
    }

    const data: IOccupation | null = await response.json();
    console.log("Ocupación:", data);
    return data; // Asegúrate de devolver el dato
  } catch (error) {
    console.error(error);
  }
};
