"use client";
import { createContext, useState, useEffect } from "react";
import {
  IUser,
  IUserProfile,
  IUserContext,
  ILogin,
  IRegister,
} from "@/interface/interfaceUser";
import { useRouter } from "next/navigation";
import { postSignin, postSignup, getUser_Id } from "../server/fechUser";

export const UserContext = createContext<IUserContext>({
  user: {} as IUser,
  userProfile: {} as IUserProfile,
  setUser: () => {},
  setUserProfile: () => {},
  login: async () => false,
  handleGoogleLogin: () => {},
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isProfileComplete: false,
  setIsProfileComplete: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>({} as IUser);
  const [userProfile, setUserProfile] = useState<IUserProfile>(
    {} as IUserProfile
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const login = async (credentials: ILogin) => {
    try {
      const data = await postSignin(credentials);
      if (!data.token) {
        throw new Error("Invalid Token");
      }

      typeof window !== "undefined" &&
        localStorage.setItem("token", data.token);
      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(data.id));

      setIsAuthenticated(true);
      const profileData = await getUser_Id(data.id, data.token); // Obtener datos del perfil

      // Asegúrate de que profileData tenga todos los campos requeridos para IUser
      const completeUser: IUser = {
        user_id: profileData.user_id,
        user_name: profileData.user_name,
        email: profileData.email,
        password: "", // Asigna un valor por defecto o maneja la contraseña de otra manera
        country: profileData.country_id, // Asume que esto corresponde al país
        city: profileData.city_id, // Asume que esto corresponde a la ciudad
        birthdate: profileData.birthdate
          ? new Date(profileData.birthdate)
          : new Date(), // Proporciona un valor por defecto
        status: true, // Asigna un valor adecuado
        role: "user",
      };

      setUser(completeUser); // Actualiza el usuario con los datos completos
      setUserProfile(profileData); // Actualiza el perfil del usuario
      setIsProfileComplete(checkProfileComplete(completeUser)); // Actualiza el estado del perfil

      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleGoogleLogin = async (userData: IUser) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");

    if (token) {
      console.log("userData de Google", userData);
      setIsAuthenticated(true);

      // Llama a tu API para obtener los datos actualizados del usuario
      const userId = userData.user_id; // Asegúrate de tener el user_id correcto aquí
      const dataUser = await getUser_Id(userId, token); // Obtén los datos del perfil

      // Transformar dataUser a IUser
      const completeUser: IUser = {
        name: dataUser.user_name, // Asegúrate de que esto sea correcto
        email: dataUser.email,
        password: "", // Manejar la contraseña apropiadamente
        country: dataUser.country_id, // Asume que country_id se mapea a country
        city: dataUser.city_id, // Asume que city_id se mapea a city
        birthdate: new Date(dataUser.birthdate), // Asegúrate de convertir correctamente
        status: true, // Define el valor predeterminado según tu lógica
        role: "user", // Define el valor predeterminado según tu lógica
        user_name: dataUser.user_name,
        user_id: dataUser.user_id,
      };

      setUser(completeUser); // Actualiza el usuario con los datos completos
      setIsProfileComplete(checkProfileComplete(completeUser));

      // Almacena en localStorage
      typeof window !== "undefined" && localStorage.setItem("token", token);
      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(completeUser.user_id)); // Guarda el usuario completo
      await getUserDataProfile(userId, token);
    }
  };

  const register = async (user: IRegister) => {
    try {
      const data = await postSignup(user);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    typeof window !== "undefined" && localStorage.removeItem("token");
    typeof window !== "undefined" && localStorage.removeItem("user");
    setUser({} as IUser);
    setIsAuthenticated(false);
    setIsProfileComplete(false);
    router.push("/");
  };

  const getUserDataProfile = async (user: string, token: string) => {
    console.log("user", user, "token", token);

    if (typeof token === "string") {
      const dataUser = await getUser_Id(user, token);
      setUserProfile(dataUser);
    } else {
      console.error("Token inválido. No se pudo obtener los datos del perfil.");
    }
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const userData =
      typeof window !== "undefined" && localStorage.getItem("user");
    console.log("en el contexto", userData);
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsProfileComplete(checkProfileComplete(parsedUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const user = typeof window !== "undefined" && localStorage.getItem("user");
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (user) getUserDataProfile(JSON.parse(user), token as string);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token) {
      setIsAuthenticated(true);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsProfileComplete(checkProfileComplete(parsedUser));
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, [isAuthenticated]);

  const checkProfileComplete = (user: IUser) => {
    return !!(
      user.name &&
      user.email &&
      user.country &&
      user.city &&
      user.birthdate
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userProfile,
        setUser,
        setUserProfile,
        login,
        handleGoogleLogin,
        register,
        logout,
        isAuthenticated,
        isProfileComplete,
        setIsProfileComplete,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
