
import { API } from "../helpers/helper";
import { ILogin, IRegister, IUserProfile } from "../interface/interfaceUser";

export const postSignin = async (credentials: ILogin) => {
  try {
    const response = await fetch(`${API}/users`, {
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
    throw new Error("Invalid credentials");
  }

  const data = await response.json();
  return data;
};

export const getUserId = async (userId: string ) => {
  console.log("",userId)
  const response = await fetch(`${API}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }
  const data = await response.json();
  
    const user: IUserProfile = {
        userId: userId,
        name: data.user_name,
        last_name: data.last_name,
        city: data.city_id,
        country: data.country_id,
        email: data.email,
        birthdate: data.birthdate,
    }
  return user;
};

