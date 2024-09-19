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
  console.log("data",data)
  const newData = {
    id: data.user_id,
    last_name: data.last_name,
    email: data.email,
    country: data.country_id,
    city: data.city_id,
    birthdate: data.birthdate,
  }
  return newData;
};


