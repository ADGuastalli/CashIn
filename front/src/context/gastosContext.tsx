"use client";
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { getUserExpenseAll } from "@/server/fetchExpense";

const userId = localStorage.getItem('user');

interface Gasto {
  expense_id?: string,
  tipoGasto: string;
  subtipoGasto?: string;
  monto: string;
  tipoPago?: string;
}

interface GastosState {
  gastos: Gasto[];
  selectedTipoGasto?: string;
  subtipos: string[];
}

type GastosAction =
  | {type: "INIT_GASTOS"; payload: Gasto}
  | { type: "ADD_GASTO"; payload: Gasto }
  | { type: "DELETE_GASTO"; payload: number }
  | {
      type: "SELECT_TIPO_GASTO";
      payload: { tipoGasto: string; subtipos: string[] };
    }
  | { type: "CLEAN_TIPO_GASTO" };

const GastosContext = createContext<
    | {
        state: GastosState;
        dispatch: React.Dispatch<GastosAction>;
      }
    | undefined
  >(undefined);

const gastosReducer = (
  state: GastosState,
  action: GastosAction
): GastosState => {
  switch (action.type) {
    case "INIT_GASTOS":
      const exists = state.gastos.some(g => g.monto === action.payload.monto 
          && g.tipoGasto === action.payload.tipoGasto && g.subtipoGasto === action.payload.subtipoGasto && g.tipoPago === action.payload.tipoPago);
      if (!exists) {
        return { ...state, gastos: [action.payload, ...state.gastos] };
      }
      return state;
    case "ADD_GASTO":
      return { ...state, gastos: [...state.gastos, action.payload] };
    case "DELETE_GASTO":
      return {
        ...state,
        gastos: state.gastos.filter((_, i) => i !== action.payload),
      };
    case "SELECT_TIPO_GASTO":
      return {
        ...state,
        selectedTipoGasto: action.payload.tipoGasto,
        subtipos: action.payload.subtipos,
      };
    case "CLEAN_TIPO_GASTO":
      return {
        ...state,
        selectedTipoGasto: undefined, 
        subtipos: []
      };
    default:
      throw new Error("Acción no soportada");
  }
};

export const GastosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gastosReducer, {
    gastos: [],
    selectedTipoGasto: undefined,
    subtipos: [],
  });

  const fetchGastos = async () => {
        try {
          if(userId){
            const response = await getUserExpenseAll(userId); 
            const gastosDesdeDB = response; 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            gastosDesdeDB.forEach((gasto: any) => {
              dispatch({ type: "INIT_GASTOS", payload: gasto });
            });
          }
        } catch (error) {
          console.error("Error al obtener los gastos:", error);
        }
      };

  useEffect(() => {
    fetchGastos(); 
  }, []);


  return (
    <GastosContext.Provider value={{ state, dispatch }}>
      {children}
    </GastosContext.Provider>
  );
};

export const useGastos = () => {
  const context = useContext(GastosContext);
  if (!context) {
    throw new Error("useGastos debe usarse dentro de un GastosProvider");
  }
  return context;
};
