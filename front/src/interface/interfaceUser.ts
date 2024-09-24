interface IUserProfile {
  id: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
  birthdate: string;
  ocupacion?:
    | "independiente"
    | "asalariado"
    | "contratista"
    | "emprendedor"
    | "ama de casa"
    | "estudiante";
  vivecon?: boolean;
  hijos?: boolean;
  cantidad_de_hijos?: number;
  estadocivil?: string;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  country: string;
  city: string;
  birthdate: Date;
  status: boolean;
  role: string;
  user_name: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  email: string;
  password: string;
  confirmPassword?: string;
  country_id?: number;
  city_id?: number;
  status_id?: number;
  last_name?: string;
  user_name?: string;
  birthdate?: Date;
  googleId?: string;
  facebookId?: string;
}

interface IErrorsLogin {
  email?: string;
  password?: string;
}

interface IErrorsRegister {
  name?: string;
  username?: string;
  email?: string;
  dni?: string;
  city?: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
  birthdate?: string;
  status?: boolean;
  role?: string;
}

interface IUserContext {
  user: IUser | null;
  userProfile: IUserProfile;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  login: (credentials: ILogin) => Promise<boolean>;
  register: (credentials: IRegister) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileComplete: boolean;
  setIsProfileComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export type {
  IUser,
  ILogin,
  IRegister,
  IUserContext,
  IErrorsLogin,
  IErrorsRegister,
  IUserProfile,
};
