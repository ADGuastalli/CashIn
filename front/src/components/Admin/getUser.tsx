import React, { useState } from "react";
import { getAllUsers, deleteUser } from "@/server/fechUser";
import ImgSaerch from "../../public/assets/svg/search-alt-3-svgrepo-com.svg";
import ImgDelete from "../../public/assets/svg/delete-svgrepo-com.svg";
import Image from "next/image";
import Swal from "sweetalert2";

export interface ICity {
  city: string; // Nombre de la ciudad
}

export interface ICountry {
  country: string; // Nombre del país
}

export interface IOccupation {
  occupation: string; // Nombre de la ocupación
}

export interface IMaritalStatus {
  marital_status: string; // Estado civil
}

export interface IDwelling {
  dwelling: string; // Tipo de vivienda
}

export interface IUserData {
  Datum: {
    // Cambia Data a Datum
    Occupation?: IOccupation; // Ocupación del usuario
    MaritalStatus?: IMaritalStatus; // Estado civil
    Dwelling?: IDwelling; // Vivienda
  };
}

export interface IUserProfile extends IUserData {
  user_id: string; // ID del usuario
  user_name: string; // Nombre del usuario
  last_name: string; // Apellido del usuario
  email: string; // Correo electrónico
  birthdate: string; // Fecha de nacimiento
  admin: boolean; // ¿Es admin?
  premium: boolean; // ¿Es premium?
  country_id: number; // ID del país
  city_id: number; // ID de la ciudad
  child?: string; // Información sobre hijos (opcional)
  Country?: ICountry; // Agregar Country
  City?: ICity; // Agregar City
}

export default function Usuarios() {
  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para obtener los usuarios
  React.useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((data) => {
        setUsers(data);
        console.log("lista de usuarios:", data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const openModal = (user: IUserProfile) => {
    console.log(user); // Verifica que el usuario contenga todos los datos necesarios
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (user: IUserProfile) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar al usuario ${user.user_name}? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(user.user_id);
          setUsers(users.filter((u) => u.user_id !== user.user_id));
          Swal.fire(
            "¡Eliminado!",
            `El usuario ${user.user_name} ha sido eliminado.`,
            "success"
          );
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          Swal.fire("Error", "Hubo un error al eliminar el usuario.", "error");
        }
      }
    });
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios Registrados</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">¿Premium?</th>
            <th className="py-2 px-4 border-b">Eliminar</th>
            <th className="py-2 px-4 border-b">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.user_id} className="border-t">
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  {user.last_name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user.user_name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user.premium ? "Sí" : "No"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(user)}
                  >
                    <Image
                      src={ImgDelete}
                      alt="delete"
                      width={20}
                      height={20}
                    />
                  </button>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => openModal(user)}>
                    <Image
                      src={ImgSaerch}
                      alt="search"
                      width={20}
                      height={20}
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white py-6 px-20 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Detalles del Usuario</h2>
            <p>Email: {selectedUser.email}</p>
            <p>Country: {selectedUser.Country?.country || "No especificado"}</p>
            <p>City: {selectedUser.City?.city || "No especificado"}</p>
            {selectedUser.Datum && (
              <>
                <p>
                  Ocupación:{" "}
                  {selectedUser.Datum.Occupation?.occupation ||
                    "No especificado"}
                </p>
                <p>
                  Estado civil:{" "}
                  {selectedUser.Datum.MaritalStatus?.marital_status ||
                    "No especificado"}
                </p>
                <p>
                  Vivienda:{" "}
                  {selectedUser.Datum.Dwelling?.dwelling || "No especificado"}
                </p>
              </>
            )}
            <p>
              Birthdate: {new Date(selectedUser.birthdate).toLocaleDateString()}
            </p>
            <p>Nombre: {selectedUser.user_name}</p>
            <p>Apellido: {selectedUser.last_name}</p>
            <p>User ID: {selectedUser.user_id}</p>
            <p>Premium: {selectedUser.premium ? "Sí" : "No"}</p>
            <p>Admin: {selectedUser.admin ? "Sí" : "No"}</p>
            <p>Hijos: {selectedUser.child || "No especificado"}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
