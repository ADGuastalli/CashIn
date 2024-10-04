"use client";
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { getUserPersonalPropertyAll } from "@/server/fetchBien";

const userId = localStorage.getItem('user');

interface PersonalProperty {
  personal_property_id?: string,
  personal_property_type: string;
  personal_property?: string;
  mount: string;
  date?: string;
}

interface PersonalPropertyState {
  bienes: PersonalProperty[];
}

type PersonalPropertyAction =
  | {type: "INIT_BIEN"; payload: PersonalProperty}
  | { type: "ADD_BIEN"; payload: PersonalProperty }
  | { type: "DELETE_BIEN"; payload: number }

const PersonalPropertyContext = createContext<
    | {
        state: PersonalPropertyState;
        dispatch: React.Dispatch<PersonalPropertyAction>;
      }
    | undefined
  >(undefined);

const PersonalPropertyReducer = (
  state: PersonalPropertyState,
  action: PersonalPropertyAction
): PersonalPropertyState => {
  switch (action.type) {
    case "INIT_BIEN":
      const exists = state.bienes.some(i => i.mount === action.payload.mount 
          && i.personal_property_type === action.payload.personal_property_type && i.personal_property === action.payload.personal_property );
      if (!exists) {
        return { ...state, bienes: [action.payload, ...state.bienes] };
      }
      return state;
    case "ADD_BIEN":
      return { ...state, bienes: [...state.bienes, action.payload] };
    case "DELETE_BIEN":
      return {
        ...state,
        bienes: state.bienes.filter((_, i) => i !== action.payload),
      };
    default:
      throw new Error("Acción no soportada");
  }
};

export const PersonalPropertyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(PersonalPropertyReducer, {
    bienes: [],
  });

  const fetchIngresos = async () => {
    try {
      if(userId){
        const response = await getUserPersonalPropertyAll(userId); 
        const BienesDesdeDB = response; 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        BienesDesdeDB.forEach((bien: any) => {
          dispatch({ type: "INIT_BIEN", payload: bien });
        });
      }
    } catch (error) {
      console.error("Error al obtener los gastos:", error);
    }
  };

    useEffect(() => {
    fetchIngresos(); 
    }, []);


  return (
    <PersonalPropertyContext.Provider value={{ state, dispatch }}>
      {children}
    </PersonalPropertyContext.Provider>
  );
};

export const usePersonalProperty = () => {
  const context = useContext(PersonalPropertyContext);
  if (!context) {
    throw new Error("useGastos debe usarse dentro de un GastosProvider");
  }
  return context;
};
