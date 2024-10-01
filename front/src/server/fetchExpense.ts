import { API } from "../helpers/helper";
import { Expense } from "@/interface/interfaceData";

export const postExpense = async ( expense: Expense, userId: string) => {
    console.log("expenses",expense)
    try {
        const response = await fetch(`${API}/expense`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            expense_category: expense.expense_category,
            pay_method:expense.pay_method,
            expense:expense.expense, 
            mount:expense.mount, 
            date: expense.date, 
            user_id: userId
            }),
        });
        
        const data = await response.json();
        console.log("enviado",data)
        
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
}

export const getUserExpenseAll = async (id: string) => {
    
    const response = await fetch(`${API}/expense-by-user/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("data::", data);

    const newData = data.map ((item: Expense )=> ({
      expense_id: item.expense_id,
      tipoGasto: item.expense_category,
      subtipoGasto: item.expense,
      monto: item.mount,
      tipoPago: item.pay_method,
    }))
    return newData;
  };
  
export const deleteGasto =  async (id: string) => {
    
  const response = await fetch(`${API}/expense/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return data;
};