interface IUserProfile {
  user_id: string;
  id?: string;
  user_name: string;
  last_name: string;
  email: string;
  country_id: string;
  city_id: string;
  birthdate: string;
  occupation_id?: string;
  vivecon?: boolean;
  child: number;
  marital_status_id?: string;
  dwelling_id: string;
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
  user_id: string;
  id?: string;
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
  setUserProfile: React.Dispatch<React.SetStateAction<IUserProfile>>;
  login: (credentials: ILogin) => Promise<boolean>;
  register: (credentials: IRegister) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileComplete: boolean;
  setIsProfileComplete: React.Dispatch<React.SetStateAction<boolean>>;
  handleGoogleLogin: (userData: IUser) => void;
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
