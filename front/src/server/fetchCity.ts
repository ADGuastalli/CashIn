import { API } from "@/helpers/helper";

export const createCities = async (city: any) => {
  try {
    const response = await fetch(`${API}/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: city }),
    });

    if (!response.ok) {
      throw new Error("Error al crear el ciudad");
    }

    const data = await response.json();
    console.log("Ciudad creado:", data);
  } catch (error) {
    console.error(error);
  }
};

export const getAllCities = async () => {
  try {
    const response = await fetch(`${API}/cities`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los ciudades");
    }

    const data = await response.json();
    console.log("Ciudades:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getCitiesById = async (city_id: any) => {
  try {
    const response = await fetch(`${API}/cities/${city_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener el ciudad");
    }

    const data = await response.json();
    console.log("Ciudad:", data);
  } catch (error) {
    console.error(error);
  }
};
