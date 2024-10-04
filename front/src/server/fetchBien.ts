import { API } from "../helpers/helper";
import { PersonalProperty } from "@/interface/interfaceData";

export const postBien = async ( personal_property: PersonalProperty , userId: string) => {
  
  try {
      const response = await fetch(`${API}/personalproperty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          personal_property_type:personal_property.personal_property_type,
          personal_property:personal_property.personal_property, 
          mount:personal_property.mount, 
          date: personal_property.date, 
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

export const getUserPersonalPropertyAll = async (id: string) => {
    
  const response = await fetch(`${API}/personalproperty-by-user/${id}`, {
    method: "GET",
  });
  const data = await response.json();

  const newData = data.map ((item: PersonalProperty )=> ({
    personal_property_id: item.personal_property_id, 
    personal_property_type: item.personal_property_type,
    personal_property: item.personal_property, 
    mount: item.mount, 
    date: item.date 
  }))
  return newData;
};

export const deleteBien =  async (id: string) => {
    
  const response = await fetch(`${API}/personalproperty/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();


  return data;
};

export const getBien_categoryAll = async () => {
    const response = await fetch(`${API}/personalpropertytype`, {
      method: "GET",
    });
    const data = await response.json();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData = data.map((item: any) => item.personal_property_type);
    return newData
  }