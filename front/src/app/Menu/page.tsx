"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import MenuIcons from "@/components/Menu";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { Button_Home } from "@/components/ui/Buttons";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Menu() {
  const { isAuthenticated, userProfile } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === false) return;

    if (!isAuthenticated) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Para ingresar debes estar logueado.",
        icon: "warning",
        confirmButtonText: "Ir a Login",
      }).then(() => {
        router.push("/User/Login");
      });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <div className="text-center text-5xl">Cargando...</div>;
  }

  return (
    <div>
      <div className="mt-3 ml-3">
        <Link href={"/"}>
          <Button_Home />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen px-5 mb-20">
        {/* Aquí removemos la lógica de mostrar el modal */}

        {/* Logo */}
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
          className="mt-2"
        />

        {/* Mensaje de bienvenida */}
        <h1 className="lg:text-3xl md:text-2xl text-2xl text-center mt-6 mb-4">
          ¿Qué deseas hacer con nuestra app{" "}
          <span className="font-bold">
            {userProfile?.user_name || userProfile?.email}
          </span>
          ?
        </h1>

        {/* Mostrar mensaje si no es premium */}
        {userProfile?.premium === false && userProfile.admin === false && (
          <Link href="/Membership">
            <div className="blinking-bg flex flex-col justify-center items-center py-2 px-3 mt-5 rounded-lg">
              <p className="text-center text-gray-500">
                <span className="font-bold text-red-900 text-lg">
                  ¡Hazte premium!
                </span>{" "}
                Haz Click Aquí para acceder a todas las funcionalidades de
                CashIN.
              </p>
            </div>
          </Link>
        )}

        {/* MenuIcons con la lógica de verificación de perfil */}
        <MenuIcons />
      </div>

      {/* Estilos para el efecto de parpadeo */}
      <style jsx>{`
        .blinking-bg {
          animation: blink 5s infinite;
        }

        @keyframes blink {
          0% {
            background-color: #fca5a5;
          }
          50% {
            background-color: #ffffff;
          }
          100% {
            background-color: #fca5a5;
          }
        }
      `}</style>
    </div>
  );
}
