import { API } from "../helpers/helper";
import { Deuda } from "@/interface/interfaceData";

export const postDeuda = async ( deuda: Deuda, userId: string) => {

  try {
      const response = await fetch(`${API}/debt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          debt_category: deuda.debt_category,
          debt: deuda.debt,
          mount: deuda.mount,
          date: deuda.date,
          rate: deuda.rate,
          cuote: deuda.mount_cuote,
          recurrence: deuda.recurrence,
          mount_cuote: deuda.mount_cuote,
          user_id: userId
          }),
      });
      
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
}

export const getUserDeudasAll = async (id: string) => {
    
  const response = await fetch(`${API}/debt-by-user/${id}`, {
    method: "GET",
  });
  const data = await response.json();

  const newData = data.map ((item: Deuda )=> ({
      debt_id: item.debt_id,
      tipoDeuda: item.debt_category,
      descripcionDeuda: item.debt,
      monto: item.mount,
      interes: item.rate,
      mount_cuote: item.mount_cuote,
      date: item.date
  }))
  return newData;
};

export const deleteDeuda =  async (id: string) => {
    
  const response = await fetch(`${API}/debt/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();


  return data;
};

export const getDebt_categoryAll = async () => {
    const response = await fetch(`${API}/debt-category`, {
      method: "GET",
    });
    const data = await response.json();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData = data.map((item: any) => item.debt);
    return newData
  }