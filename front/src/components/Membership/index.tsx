"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { Button_Menu } from "../ui/Buttons";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import Image from "next/image";
import PlanesComponet from "./planes";
import { UserContext } from "@/context/userContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function MembershipComponet() {
  const { isAuthenticated } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Para ver nuestras membresías, debes estar logueado.",
        icon: "warning",
        confirmButtonText: "Ir a Login",
        allowOutsideClick: false,
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/User/Login"); // Redirigir a la página de login
        }
      });
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <div>
        <Link href="/Menu">
          <Button_Menu />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image src={Logo} alt="Logo" width={300} height={300} />
        <div className="text-center my-5">
          <h1 className="text-2xl mt-6 font-black">
            ¡HOLA! ¿Quieres conocer todo nuestro potencial?
          </h1>
          <h2 className="text-xl mt-1">
            Selecciona la mejor membresía para ti.
          </h2>
        </div>
        <div className="mt-10">
          <PlanesComponet />
        </div>
      </div>
    </div>
  );
}
