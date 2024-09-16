interface IUserProfile {
  userId: string;
  name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
  birthdate: string;
  status: boolean;
  role: string;
  employ: "independiente" | "asalariado" | "contratista" | "emprendedor" | "ama de casa" | "estudiante";
  live_with: boolean;
  family_group: number;
}

interface IUser {
  //deberia agregar userId
  name: string;
  email: string;
  password: string;
  country: string;
  city: string;
  birthdate: Date;
  status: boolean;
  role: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  login: (credentials: ILogin) => Promise<boolean>;
  register: (credentials: IRegister) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
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
