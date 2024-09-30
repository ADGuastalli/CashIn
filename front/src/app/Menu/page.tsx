"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import MenuIcons from "@/components/Menu";
import { UserContext } from "@/context/userContext";
import { hasNullProperties } from "@/helpers/hasNullProperties";
import { useRouter } from "next/navigation";
import ModalFormComplete from "@/components/ModalFormComplet";
import { Button_Home } from "@/components/ui/Buttons";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Menu() {
  const { userProfile, isAuthenticated } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Solo ejecutar este efecto cuando el estado de autenticación esté listo
  useEffect(() => {
    if (loading || isAuthenticated === undefined) return;

    console.log("Verificando autenticación:", isAuthenticated);
    console.log("userProfile en menu:", userProfile);

    if (!isAuthenticated) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Para ingresar debes estar logueado.",
        icon: "warning",
        confirmButtonText: "Ir a Login",
        allowOutsideClick: false,
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/User/Login");
        }
      });
    }
  }, [loading, isAuthenticated, userProfile, router]);

  // Este efecto se asegura de que el estado de carga se desactive
  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Mostrar un indicador de carga en lugar de devolver null
  if (loading) {
    return <div>Cargando...</div>; // O puedes usar un spinner o algo visualmente más atractivo
  }

  return (
    <div>
      <div>
        <Link href={"/"}>
          <Button_Home />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen px-5">
        {hasNullProperties(userProfile) && (
          <ModalFormComplete router={router} user_id={userProfile?.user_id} />
        )}
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
          className="mt-2"
        />
        <h1 className="lg:text-3xl md:text-2xl text-2xl text-center mt-6 mb-4">
          ¿Qué deseas hacer con nuestra app{" "}
          <span className="font-bold">
            {userProfile?.last_name || userProfile?.email}
          </span>
          ?
        </h1>
        <MenuIcons />
      </div>
    </div>
  );
}
