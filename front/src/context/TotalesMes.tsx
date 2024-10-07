'use client'
import { createContext, useState, useEffect, useContext } from "react";
import { ITotalesData } from "@/interface/interfaceData";
import { getTotalIncome } from "@/server/fetchIncome";
import { getTotalExpense } from "@/server/fetchExpense";
import { getTotalSaving } from "@/server/fetchBien";
const userId = localStorage.getItem('user');

export const TotalesContext = createContext<ITotalesData>({
    totalExpense: 0,
    totalIncomes: 0,
    totalSaving: 0,
});

export const TotalesMesProvider = ({ children }: { children: React.ReactNode })  => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [totalExpense, setTotalExpense] = useState(56000); 
    const [totalIncomes, setTotalIncomes] = useState(156000); 
    const [totalSaving, setTotalSaving] = useState(30000); 

    useEffect(()=>{
        const fetchTotalIncome = async () => {
            try {
                const response = await getTotalIncome(userId as string); 
                
                setTotalIncomes(response);
            } catch (error) {
                console.error("Error fetching expense categories", error);
            }
        };

        const fetchTotalExpense = async () => {
            try {
                const response = await getTotalExpense(userId as string); 
                
                setTotalExpense(response);
            } catch (error) {
                console.error("Error fetching expense categories", error);
            }
        };

        const fetchTotalSaving = async () => {
            try {
                const response = await getTotalSaving(userId as string); 
                
                setTotalSaving(response);
            } catch (error) {
                console.error("Error fetching expense categories", error);
            }
        };

        fetchTotalIncome();
        fetchTotalExpense();
        fetchTotalSaving();

    },[])

    return (
        <TotalesContext.Provider 
            value={{
                totalIncomes,
                totalExpense,
                totalSaving
            }}>
            {children}
        </TotalesContext.Provider>
    )
}

export const useTotalMes = () => {
    const context = useContext(TotalesContext);
    if (!context) {
      throw new Error("useGastos debe usarse dentro de un GastosProvider");
    }
    return context;
  };
  