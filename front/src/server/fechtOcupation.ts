import { API } from "@/helpers/helper";

export const getAllOccupations = async () => {
  try {
    const response = await fetch(`${API}/occupation`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener las ocupaciones");
    }

    const data = await response.json();
    console.log("Ocupaciones:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getOccupationById = async (occupation_id: any) => {
  try {
    const response = await fetch(`${API}/occupation/${occupation_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener la ocupación");
    }

    const data = await response.json();
    console.log("Ocupación:", data);
  } catch (error) {
    console.error(error);
  }
};
