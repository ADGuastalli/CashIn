import { API } from "@/helpers/helper";

export const getAllMaritalStatuses = async () => {
  try {
    const response = await fetch(`${API}/marital-status`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los estados civiles");
    }

    const data = await response.json();
    console.log("Estados civiles:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMaritalStatusById = async (status_id: any) => {
  try {
    const response = await fetch(`${API}/marital-status/${status_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener el estado civil");
    }

    const data = await response.json();
    console.log("Estado civil:", data);
  } catch (error) {
    console.error(error);
  }
};
