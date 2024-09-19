import { API } from "@/helpers/helper";
import { IUserProfile } from "@/interface/interfaceUser";


export const updateUserProfile = async (formData: IUserProfile,token:string | null) => {
    try {
      const userId = formData.email; //
  
      // Verificar que el token y el ID están presentes
      if (!token || !userId) {
        throw new Error("Usuario no disponible");
      }
      //el que sea para completar el perfil ojo enviar ocupacion por separado
      const response = await fetch(`${API}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
         body: JSON.stringify({
          ...formData,
          birthdate: new Date(formData.birthdate), 
      }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Error message", errorData.message);
        
      }
  
      const updatedUser = await response.json();
      return updatedUser
  
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  //actalizar todo en un solo controlador updateProfile
  export const postOcupacion = async (ocupacion: string , token: string) => { 
    try {
        const response = await fetch(`${API}/occupation/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
             body: JSON.stringify(ocupacion),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Error message", errorData.message);
            
          }
          const userOcupacion = await response.json();
          return userOcupacion
    } catch (error) {
        console.log("Error al crear la ocupacion")
    }
  }