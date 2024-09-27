import React from "react";
import { IUserProfile } from "@/interface/interfaceUser";
import { Button_actions } from "../ui/Buttons";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import ImgAvatar from "../../public/assets/svg/avatar-people-person-svgrepo-com.svg";

function HeaderProfile({ user }: { user: IUserProfile }) {
  const { logout } = useContext(UserContext);
  const status = {
    nivel_1: "Pobreza",
    nivel_2: "Endeudamiento",
    nivel_3: "Sobrevivencia Financiera",
    nivel_4: "Estabilidad financiera",
    nivel_5: "Seguridad financiera",
    nivel_6: "Independencia financiera",
    nivel_7: "Libertad financiera",
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3E1A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire(
          "Sesión cerrada",
          "Has cerrado sesión exitosamente.",
          "success"
        );
      }
    });
  };

  return (
    <div className="flex flex-col-reverse items-center md:flex-row justify-between  w-screen h-auto px-4 py-4 md:pl-72 md:pr-10 bg-white shadow-md">
      <div>
        <h2>Analisis de bienestar financiero</h2>
        <p>Status</p>
        <div className="flex flex-row-reverse justify-around items-center mt-4">
          <div className="inline-flex items-center justify-center aspect-square rounded-full border-2 border-gray-400 px-2">
            <span className="text-xs">4.3</span>
          </div>
          <div>{status.nivel_1}</div>
        </div>
      </div>
      <div>
        <div className="flex justify-around  mb-4">
          <div>
            <h3 className="font-bold text-xl">
              Bienvenido {user.user_name} !!
            </h3>
            <button
              onClick={handleLogout}
              className="font-bold rounded-xl bg-bad_status text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105"
            >
              Cerrar Sesión
            </button>
          </div>
          <div className="ml-4">
            <Image
              className="w-12 h-12 rounded-full bg-slate-500"
              src={ImgAvatar}
              alt="avatar"
              height={5}
              width={5}
            />
          </div>
        </div>
        <Link href="/Cita">
          <Button_actions> Solicitar asesoria financiera </Button_actions>
        </Link>
      </div>
    </div>
  );
}

export default HeaderProfile;
