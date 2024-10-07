"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { getUserDeudasAll } from "@/server/fetchDebt";

const userId = typeof window !== "undefined" && localStorage.getItem("user");

interface Deuda {
  debt_id?: string;
  tipoDeuda: string;
  descripcionDeuda?: string;
  monto: string;
  interes?: number;
  cuote?: number;
  mount_cuote?: number;
  date?: string;
}

interface DeudaState {
  deudas: Deuda[];
}

type DeudaAction =
  | { type: "INIT_DEUDA"; payload: Deuda }
  | { type: "ADD_DEUDA"; payload: Deuda }
  | { type: "DELETE_DEUDA"; payload: number };

const DeudaContext = createContext<
  | {
      state: DeudaState;
      dispatch: React.Dispatch<DeudaAction>;
    }
  | undefined
>(undefined);

const DeudaReducer = (state: DeudaState, action: DeudaAction): DeudaState => {
  switch (action.type) {
    case "INIT_DEUDA":
      const exists = state.deudas.some(
        (i) =>
          i.monto === action.payload.monto &&
          i.tipoDeuda === action.payload.tipoDeuda &&
          i.descripcionDeuda === action.payload.descripcionDeuda
      );
      if (!exists) {
        return { ...state, deudas: [action.payload, ...state.deudas] };
      }
      return state;
    case "ADD_DEUDA":
      return { ...state, deudas: [...state.deudas, action.payload] };
    case "DELETE_DEUDA":
      return {
        ...state,
        deudas: state.deudas.filter((_, i) => i !== action.payload),
      };
    default:
      throw new Error("Acción no soportada");
  }
};

export const DeudaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(DeudaReducer, {
    deudas: [],
  });

  const fetchIngresos = async () => {
    try {
      if (userId) {
        const response = await getUserDeudasAll(userId);
        const DeudasDesdeDB = response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        DeudasDesdeDB.forEach((deuda: any) => {
          dispatch({ type: "INIT_DEUDA", payload: deuda });
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
    <DeudaContext.Provider value={{ state, dispatch }}>
      {children}
    </DeudaContext.Provider>
  );
};

export const useDeuda = () => {
  const context = useContext(DeudaContext);
  if (!context) {
    throw new Error("useGastos debe usarse dentro de un GastosProvider");
  }
  return context;
};
