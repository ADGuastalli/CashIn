import { API } from "@/helpers/helper";

// Cambiar la firma de la función para que acepte FormData
export const createBook = async (formData: FormData) => {
  const response = await fetch(`${API}/book`, {
    method: "POST",
    body: formData, // Pasamos directamente el FormData
  });

  if (!response.ok) {
    throw new Error("Error al crear el libro");
  }

  return response.json();
};

// Otras funciones permanecen igual
export const getAllBooks = async () => {
  const response = await fetch(`${API}/book`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const deleteBook = async (id: string) => {
  const response = await fetch(`${API}/book/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
