"use client";

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import UserIcon from "../../public/assets/svg/user-circle-svgrepo-com.svg";
import Swal from "sweetalert2";
import { Button_nadvar, Button_actions } from "@/components/ui/Buttons";

export default function Navbar() {
  const { user, setUser, isAuthenticated, logout } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);

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

  const handleMenuClick = () => {
    setIsActive(false); // Cierra el menú hamburguesa
  };

  return (
    <div className="relative z-10 backdrop-blur-lg border-b-2 border-black/5 bg-transparent flex flex-col mx-5 lg:flex-row items-center justify-between py-2 shadow-dark-mild lg:py-4 rounded-lg">
      <div className="flex items-center px-3 flex-grow">
        <Link href="/" className="flex items-center">
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </Link>
        <button
          className="lg:hidden flex items-center pl-10 py-1 text-white"
          onClick={() => setIsActive(!isActive)}
        >
          <svg
            className="w-6 h-6 text-[#016285]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div
        className={`lg:flex-grow lg:flex lg:items-center lg:space-x-8 ${
          isActive ? "block mt-5" : "hidden"
        } lg:block lg:flex-row flex-col lg:space-y-0 space-y-4`}
      >
        <div className="flex-grow flex flex-col lg:flex-row lg:space-x-8">
          <Link href="/home/homeRutinas" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm lg:text-base">
              PRODUCTOS
            </Button_nadvar>
          </Link>
          <Link href="/home/homePlanes" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm lg:text-base">
              EDUCACION
            </Button_nadvar>
          </Link>
          <Link href="/home/homeCursos" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm lg:text-base">
              MERCADO FINANCIERO
            </Button_nadvar>
          </Link>
          <Link href="/home/homeCursos" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm lg:text-base">
              CONTACTO
            </Button_nadvar>
          </Link>
        </div>
        <div className="flex items-center space-x-4 px-3 lg:space-x-6">
          {isAuthenticated ? (
            <>
              <span className="text-[#97D6DF] dark:text-[#97D6DF] text-sm lg:text-lg">
                Bienvenido, {user?.name || user?.email || ""}
              </span>
              <div className="flex items-center ms-10 md:me-2">
                <Link
                  href="/dashboard"
                  className="text-[#97D6DF] dark:text-[#97D6DF] lg:px-2 hover:text-[#FF3E1A] text-sm"
                >
                  <Image
                    src={UserIcon}
                    alt="User Icon"
                    className="w-10 h-10 lg:w-12 lg:h-12"
                  />
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="relative rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-4 py-2 text-sm font-bold uppercase text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:outline-none dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722]"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/User/Register" onClick={handleMenuClick}>
                <Button_actions>Registrarse</Button_actions>
              </Link>
              <Link href="/User/Login" onClick={handleMenuClick}>
                <Button_actions>Iniciar sesión</Button_actions>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
