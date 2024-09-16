"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface Gasto {
  tipoGasto: string;
  subtipoGasto?: string;
  monto: string;
}

interface GastosState {
  gastos: Gasto[];
  selectedTipoGasto?: string;
  subtipos: string[];
}

type GastosAction =
  | { type: "ADD_GASTO"; payload: Gasto }
  | { type: "DELETE_GASTO"; payload: number }
  | {
      type: "SELECT_TIPO_GASTO";
      payload: { tipoGasto: string; subtipos: string[] };
    };

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
