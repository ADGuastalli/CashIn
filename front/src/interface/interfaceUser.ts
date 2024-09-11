interface IUser {
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
  username: string;
  password: string;
}

interface IRegister {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
  birthdate: string;
}

interface IErrorsLogin {
  username?: string;
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
};
