import { API } from "@/helpers/helper";

export const createCountry = async (country: any) => {
  try {
    const response = await fetch(`${API}/country`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: country }),
    });

    if (!response.ok) {
      throw new Error("Error al crear el país");
    }

    const data = await response.json();
    console.log("País creado:", data);
  } catch (error) {
    console.error(error);
  }
};

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${API}/country`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los países");
    }

    const countries = await response.json();
    console.log("Países:", countries);
    return countries;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getCountryById = async (country_id: any) => {
  try {
    const response = await fetch(`${API}/country/${country_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener el país");
    }

    const data = await response.json();
    console.log("País:", data);
  } catch (error) {
    console.error(error);
  }
};
