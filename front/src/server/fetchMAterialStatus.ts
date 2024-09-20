import { API } from "@/helpers/helper";

interface IMarital {
  marital_status_id: string;
  marital_status: string;
}

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

export const getMaritalStatusById = async (marital_status_id: IMarital) => {
  try {
    const response = await fetch(`${API}/marital-status/${marital_status_id}`, {
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
