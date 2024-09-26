import { API } from "@/helpers/helper";

interface IDwelling {
  dwelling_id: string;
  dwelling: string;
}

export const getAllDwellings = async () => {
  try {
    const response = await fetch(`${API}/dwelling`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener las viviendas");
    }

    const data = await response.json();
    console.log("Viviendas:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getDwellingById = async (dwelling_id: IDwelling) => {
  try {
    const response = await fetch(`${API}/dwelling/${dwelling_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener la vivienda");
    }

    const data = await response.json();
    console.log("Vivienda:", data);
  } catch (error) {
    console.error(error);
  }
};
