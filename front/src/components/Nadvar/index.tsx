"use client";

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import Swal from "sweetalert2";
import {
  Button_nadvar,
  Button_actions,
  Button_Menu,
} from "@/components/ui/Buttons";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(UserContext);
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
    setIsActive(false);
  };

  return (
    <div className="relative z-10 backdrop-blur-lg border-b-2 border-black/5 bg-transparent flex flex-col items-center mx-5 py-2 shadow-dark-mild lg:py-4 rounded-lg">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="Logo"
            width={100}
            height={100}
            className="my-5 w-[80%] sm:w-[100px]"
          />
        </Link>

        {/* Menu Items for Large Screens */}
        <div className="flex-grow hidden lg:flex justify-center space-x-8">
          <Link href="/Menu" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm font-bold lg:text-base">
              CashInBOT
            </Button_nadvar>
          </Link>
          <Link href="#Producto" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm font-bold lg:text-base">
              PRODUCTOS
            </Button_nadvar>
          </Link>
          <Link href="#Educacion" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm font-bold lg:text-base">
              EDUCACION
            </Button_nadvar>
          </Link>
          <Link href="/Construccion" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm font-bold lg:text-base">
              MERCADO FINANCIERO
            </Button_nadvar>
          </Link>
          <Link href="/Membership" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm font-bold lg:text-base">
              MEMBRESIAS
            </Button_nadvar>
          </Link>
          <Link href="/Contacto" onClick={handleMenuClick}>
            <Button_nadvar className="text-sm font-bold lg:text-base">
              CONTACTO
            </Button_nadvar>
          </Link>
        </div>

        {/* User Welcome and Logout Button */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              {/* User Logo and Logout Button for Large Screens */}
              <div className="hidden lg:flex items-center space-x-4">
                <Link href="/Menu">
                  <Button_Menu />
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-bold rounded-xl bg-bad_status text-white px-4 py-2 m-2 text-sm 
                    transition-transform duration-300 transform hover:scale-105"
                >
                  Cerrar Sesión
                </button>
              </div>
              {/* Hamburger Menu for Small Screens */}
              <button
                className="flex items-center lg:hidden"
                onClick={() => setIsActive(!isActive)}
              >
                <svg
                  className="w-10 h-10 text-[#016285]"
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
            </>
          ) : (
            <Link href="/User/Login">
              <Button_actions>Iniciar sesión</Button_actions>
            </Link>
          )}
        </div>
      </div>

      {/* Hamburger Menu for Small Screens */}
      {isActive && isAuthenticated && (
        <div className="lg:hidden flex flex-col space-y-2 mt-2 w-full text-left">
          <div className="flex flex-col items-start space-y-2">
            <Link href="/Menu" onClick={handleMenuClick}>
              <Button_nadvar className="text-sm font-bold lg:text-base">
                CashInBOT
              </Button_nadvar>
            </Link>
            <Link href="#Producto" onClick={handleMenuClick}>
              <Button_nadvar className="text-sm font-bold lg:text-base">
                PRODUCTOS
              </Button_nadvar>
            </Link>
            <Link href="#Educacion" onClick={handleMenuClick}>
              <Button_nadvar className="text-sm font-bold lg:text-base">
                EDUCACION
              </Button_nadvar>
            </Link>
            <Link href="/Construccion" onClick={handleMenuClick}>
              <Button_nadvar className="text-sm font-bold lg:text-base">
                MERCADO FINANCIERO
              </Button_nadvar>
            </Link>
            <Link href="/Membership" onClick={handleMenuClick}>
              <Button_nadvar className="text-sm font-bold lg:text-base">
                MEMBRESIAS
              </Button_nadvar>
            </Link>
            <Link href="/Contacto" onClick={handleMenuClick}>
              <Button_nadvar className="text-sm font-bold lg:text-base">
                CONTACTO
              </Button_nadvar>
            </Link>
            <div className="flex flex-grow items-center">
              <div className="ml-5 mr-32">
                <Link href="/Menu">
                  <Button_Menu />
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="font-bold rounded-xl bg-bad_status text-white px-4 py-2 m-2 text-sm 
                    transition-transform duration-300 transform hover:scale-105"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
