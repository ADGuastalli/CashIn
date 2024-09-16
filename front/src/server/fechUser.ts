import { API } from "../helpers/helper";
import { ILogin, IRegister, IUserProfile } from "../interface/interfaceUser";

export const postSignin = async (credentials: ILogin) => {
  try {
    const response = await fetch(`${API}/auth/signin`, {
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
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postSignup = async (credentials: IRegister) => {
  const response = await fetch(`${API}/auth/signup`, {
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
  return data;
};


export const updateUserProfile = async (formData: IUserProfile,token:string | null) => {
  try {
    const userId = formData.email; //

    // Verificar que el token y el ID están presentes
    if (!token || !userId) {
      throw new Error("Usuario no disponible");
    }

    const response = await fetch(`${API}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
       body: JSON.stringify({
        ...formData,
        birthdate: new Date(formData.birthdate), 
    }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Error message", errorData.message);
      
    }

    const updatedUser = await response.json();
    return updatedUser

  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
  }
};