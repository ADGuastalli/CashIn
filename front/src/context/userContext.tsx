"use client";
import { createContext, useState, useEffect } from "react";
import {
  IUser,
  IUserContext,
  ILogin,
  IRegister,
} from "@/interface/interfaceUser";
import { useRouter } from "next/navigation";
import { postSignin, postSignup } from "../server/fechUser";

export const UserContext = createContext<IUserContext>({
  user: {} as IUser,
  setUser: () => {},
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const login = async (credentials: ILogin) => {
    try {
      const data = await postSignin(credentials);
      if (!data.token) {
        throw new Error("Invalid Token");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
      router.push("/");
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
    setUser({} as IUser);
    setIsAuthenticated(false);
    router.push("/");
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [user]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      return;
    }

    setUser({} as IUser);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
