import { API } from "@/helpers/helper";

export interface IDataService {
  data_service?: number;
  name: string; // Cambiado para alinearse con el backend
  service_id: number;
  bank_id: string;
  secuence: number; // Asegúrate de que sea un número
  opening_amount: number;
  interest_rate: number;
  requeriment: string;
  benefit_offered: string;
  trade_name: string;
  country_id: string; // Asegúrate de que esté incluido en el payload
}

export const createDataService = async (data: IDataService) => {
  try {
    const response = await fetch(`${API}/data-services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataService = await response.json();
    return dataService;
  } catch (error) {
    console.error(error);
  }
};

export const getAllDataService = async (): Promise<IDataService[]> => {
  try {
    const response = await fetch(`${API}/data-services`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }
    const dataServices = await response.json();
    console.log("Servicios:", dataServices);
    return dataServices;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDataServiceById = async (data_service: string) => {
  try {
    const response = await fetch(`${API}/data-services/${data_service}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error al obtener el servicio");
    }
    const dataService = await response.json();
    console.log("Servicio:", dataService);
  } catch (error) {
    console.error(error);
  }
};

export const deleteDataService = async (data_service: string) => {
  try {
    const response = await fetch(`${API}/data-services/${data_service}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el servicio");
    }
    const dataService = await response.json();
    console.log("Servicio:", dataService);
  } catch (error) {
    console.error(error);
  }
};
