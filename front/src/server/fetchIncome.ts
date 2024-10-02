import { API } from "../helpers/helper";
import { Income } from "@/interface/interfaceData";

export const postIncome = async (income: Income , userId: string) => {
    
    try {
        const response = await fetch(`${API}/incomes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            income_category: income.income_category, 
            income: income.income, 
            mount: income.mount, 
            date: income.date,
            user_id: userId
            }),
        });
        
        const data = await response.json();
  
        return data;
      } catch (error) {
        console.log(error);
      }
}

export const getUserIncomeAll = async (id: string) => {
    
    const response = await fetch(`${API}/incomes-by-user/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("data:income", data)
    const newData = data.map ((item: Income )=> ({
        income_id:item.income_id,
        tipoIngreso: item.income_category,
        descripcionIngreso:item.income,
        monto: item.mount,
        date:item.date
    }))
    return newData;
  };
  
export const deleteIngreso =  async (id: string) => {
    
  const response = await fetch(`${API}/incomes/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return data;
};