"use client";
import { createContext, useState, useEffect } from "react";
import {
  IUser,
  IUserContext,
  ILogin,
  IRegister,
} from "@/interface/interfaceUser";
import { useRouter } from "next/navigation";
import { postSignin, postSignup, getUser_Id } from "../server/fechUser";

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isProfileComplete: false,
  setIsProfileComplete: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const router = useRouter();

  const login = async (credentials: ILogin) => {
    try {
      const data = await postSignin(credentials);
      if (!data.token) {
        throw new Error("Invalid Token");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data.user);
      setIsAuthenticated(true);
      setIsProfileComplete(checkProfileComplete(data));

      return true;
    } catch (error) {
      console.log(error);
      throw error;
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({} as IUser);
    setIsAuthenticated(false);
    setIsProfileComplete(false);
    router.push("/");
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
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
  }, []);

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
        setUser,
        login,
        register,
        logout,
        isAuthenticated,
        isProfileComplete,
        setIsProfileComplete,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
