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

export const getIncomes_categoryAll = async () => {
  const response = await fetch(`${API}/income-categories`, {
    method: "GET",
  });
  const data = await response.json();
  console.log("categories incomes",data)
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newData = data.map((item: any) => item.income_category);
  return newData
}

export const getTotalIncome = async (userId:string) => {
  //incomesExpenses/totalincomeMonthly
  const response = await fetch(`${API}//${userId}`,{
    method: "GET",
  });
  const data = await response.json();

  return data
}
