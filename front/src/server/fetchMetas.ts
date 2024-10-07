import { API } from "../helpers/helper";
import { Meta } from "@/interface/interfaceData";


export const postMeta = async ( meta: Meta, userId: string) => {

    try {
        const response = await fetch(`${API}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            goal: meta.goal, 
            mount: meta.mount, 
            date: meta.date,
            percentage: meta.percentage, 
            time_months: meta.time_months,  
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

export const getUserMetaAll = async (id: string) => {
    
    const response = await fetch(`${API}//${id}`, {
      method: "GET",
    });
    const data = await response.json();

    const newData = data.map ((item: Meta )=> ({
        goal_id: item.goal_id,
        goal: item.goal,
        mount: item.mount,
        time_months: item.time_months,
        percentage: item.percentage,
        date: item.date,
    }))
    return newData;
  };
  
  export const deleteMeta =  async (id: string) => {
    
    const response = await fetch(`${API}//${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
  
  
    return data;
  };