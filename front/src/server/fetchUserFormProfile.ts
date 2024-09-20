import { API } from "@/helpers/helper";
import { IUserProfile } from "@/interface/interfaceUser";

export const updateUserProfile = async (
  formData: IUserProfile,
  token: string | null
) => {
  console.log("formdataaaa", formData);

  try {
    const userId = formData.user_id;

    if (!token || !userId) {
      throw new Error("Usuario no disponible");
    }

    const response = await fetch(`${API}/user/${userId}/complete-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        birthdate: new Date(formData.birthdate),
      }),
    });

    return response;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    throw error;
  }
};

//actalizar todo en un solo controlador updateProfile
export const postOcupacion = async (ocupacion: string, token: string) => {
  try {
    const response = await fetch(`${API}/occupation/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ocupacion),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Error message", errorData.message);
    }
    const userOcupacion = await response.json();
    return userOcupacion;
  } catch (error) {
    console.log("Error al crear la ocupacion");
  }
};
