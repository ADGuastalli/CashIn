import { API } from "../helpers/helper";
import { ILogin, IRegister } from "../interface/interfaceUser";

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

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postSignup = async (credentials: IRegister) => {
  const response = await fetch(`${API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Error en el registro");
  }

  const data = await response.json();
  console.log(data);
  return data;
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
  console.log("data", data);
  const newData = {
    user_id: data.user_id,
    user_name: data.user_name,
    last_name: data.last_name,
    email: data.email,
    country_id: data.country_id,
    city_id: data.city_id,
    birthdate: data.birthdate,
    child: data.child,
    dwelling_id: data.dwelling_id,
    occupation_id: data.occupation_id,
    marital_status_id: data.marital_status_id,
    premium: data.premium,
    admin: data.admin,
  };
  return newData;
};

export const getAllUsers = async () => {
  const response = await fetch(`${API}/users`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  const data = await response.json();
  return data;
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el usuario");
  }

  const data = await response.json();
  return data;
};
