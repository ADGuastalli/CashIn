import { API } from "@/helpers/helper";

export interface IService {
  service_id?: number;
  service: string;
}

export const createService = async (service: IService) => {
  try {
    const response = await fetch(`${API}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllServices = async (): Promise<IService[]> => {
  try {
    const response = await fetch(`${API}/services`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }
    const services = await response.json();
    console.log("Servicios:", services);
    return services;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getServiceById = async (service_id: string) => {
  try {
    const response = await fetch(`${API}/services/${service_id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error al obtener el servicio");
    }
    const service = await response.json();
    console.log("Servicio:", service);
  } catch (error) {
    console.error(error);
  }
};
