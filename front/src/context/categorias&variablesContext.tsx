'use client'
import { createContext, useState, useEffect, useContext } from "react";
import { ICategoriasContext } from "@/interface/interfaceData";
import { getExpense_categoryAll } from "@/server/fetchExpense";
import { getIncomes_categoryAll } from "@/server/fetchIncome";
import { getPayMethod_categoryAll } from "@/server/payMethod";
import { getDebt_categoryAll } from "@/server/fetchDebt";
import { getBien_categoryAll } from "@/server/fetchBien";

export const categoriasContext = createContext<ICategoriasContext>({
    expense_Category:[],
    income_category: [],
    payMethod:[],
    debtCategory: [],
    personalProperty: [],
});

export const CategoriasProvider = ({ children }: { children: React.ReactNode })  => {
    const [income_category,setIncome_category] = useState([]);
    const [expense_Category,setExpense_category] = useState([]);
    const [payMethod , setPayMethod] = useState([]);
    const [debtCategory,setDebt] = useState([]);
    const [personalProperty,setPersonalProperty] = useState([]);

    useEffect(()=>{
        const fetchExpenseCategories = async () => {
            try {
                const response = await getExpense_categoryAll(); 
                
                setExpense_category(response);
            } catch (error) {
                console.error("Error fetching expense categories", error);
            }
        };

        const fetchIncomesCategories = async () => {
            try {
                const response = await getIncomes_categoryAll(); 
                setIncome_category(response);
            } catch (error) {
                console.error("Error fetching expense categories", error);
            }
        };

        const fetchPayMethod = async () => {
            try {
                const response = await getPayMethod_categoryAll(); 
                setPayMethod(response);
            } catch (error) {
                console.log("Error fetching payMethod")
            }
        }

        const fetchDebt = async () => {
            try {
                const response = await getDebt_categoryAll(); 
                setDebt(response);
            } catch (error) {
                console.log("Error fetching deuda")
        }
    }

        const fetchBien = async () => {
            try {
                const response = await getBien_categoryAll(); 
                setPersonalProperty(response);
            } catch (error) {
                console.log("Error fetching personal property")
        }
    }

        fetchExpenseCategories();
        fetchIncomesCategories();
        fetchPayMethod();
        fetchDebt();
        fetchBien();
    },[])

    return (
        <categoriasContext.Provider 
            value={{expense_Category,
                    income_category,
                    payMethod,
                    debtCategory,
                    personalProperty}}>
            {children}
        </categoriasContext.Provider>
    )
}

export const useCategories = () => {
    const context = useContext(categoriasContext);
    if (!context) {
      throw new Error("useGastos debe usarse dentro de un GastosProvider");
    }
    return context;
  };
  