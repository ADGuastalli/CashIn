"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { getUserIncomeAll } from "@/server/fetchIncome";

const userId = typeof window !== "undefined" && localStorage.getItem("user");

interface Ingreso {
  income_id?: string;
  tipoIngreso: string;
  descripcionIngreso?: string;
  monto: string;
  date?: string;
}

interface IngresosState {
  ingresos: Ingreso[];
  selectedTipoIngreso?: string;
  descripcionTipos: string[];
}

type IngresosAction =
  | { type: "INIT_INGRESOS"; payload: Ingreso }
  | { type: "ADD_INGRESO"; payload: Ingreso }
  | { type: "DELETE_INGRESO"; payload: number }
  | {
      type: "SELECT_TIPO_INGRESOS";
      payload: { tipoIncome: string; subtipos: string[] };
    }
  | { type: "CLEAN_TIPO_INGRESOS" };

const IngresosContext = createContext<
  | {
      state: IngresosState;
      dispatch: React.Dispatch<IngresosAction>;
    }
  | undefined
>(undefined);

const ingresosReducer = (
  state: IngresosState,
  action: IngresosAction
): IngresosState => {
  switch (action.type) {
    case "INIT_INGRESOS":
      const exists = state.ingresos.some(
        (i) =>
          i.monto === action.payload.monto &&
          i.tipoIngreso === action.payload.tipoIngreso &&
          i.descripcionIngreso === action.payload.descripcionIngreso &&
          i.descripcionIngreso === action.payload.descripcionIngreso
      );
      if (!exists) {
        return { ...state, ingresos: [action.payload, ...state.ingresos] };
      }
      return state;
    case "ADD_INGRESO":
      return { ...state, ingresos: [...state.ingresos, action.payload] };
    case "DELETE_INGRESO":
      return {
        ...state,
        ingresos: state.ingresos.filter((_, i) => i !== action.payload),
      };
    case "SELECT_TIPO_INGRESOS":
      return {
        ...state,
        selectedTipoIngreso: action.payload.tipoIncome,
        descripcionTipos: action.payload.subtipos,
      };
    case "CLEAN_TIPO_INGRESOS":
      return {
        ...state,
        selectedTipoIngreso: undefined,
        descripcionTipos: [],
      };
    default:
      throw new Error("Acción no soportada");
  }
};

export const IngresosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(ingresosReducer, {
    ingresos: [],
    selectedTipoIngreso: undefined,
    descripcionTipos: [],
  });

  const fetchIngresos = async () => {
    try {
      if (userId) {
        const response = await getUserIncomeAll(userId);
        const IngresosDesdeDB = response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        IngresosDesdeDB.forEach((ingreso: any) => {
          dispatch({ type: "INIT_INGRESOS", payload: ingreso });
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
    <IngresosContext.Provider value={{ state, dispatch }}>
      {children}
    </IngresosContext.Provider>
  );
};

export const useIngresos = () => {
  const context = useContext(IngresosContext);
  if (!context) {
    throw new Error("useGastos debe usarse dentro de un GastosProvider");
  }
  return context;
};
