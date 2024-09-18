import { API } from "../helpers/helper";
import { ILogin, IRegister, IUserProfile } from "../interface/interfaceUser";

export const postSignin = async (credentials: ILogin) => {
  try {
    const response = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    console.log("datos que devuelve el back", data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postSignup = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API}/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Error en el registro");
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const updateUserProfile = async (
  formData: IUserProfile,
  token: string | null
) => {
  try {
    const userId = formData.email; //

    // Verificar que el token y el ID están presentes
    if (!token || !userId) {
      throw new Error("Usuario no disponible");
    }

    const response = await fetch(`${API}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        birthdate: new Date(formData.birthdate),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error desconocido");
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
  }
};

export const getUser_Id = async (id: string, token: string) => {
  console.log(token);

  const response = await fetch(`${API}/Users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
