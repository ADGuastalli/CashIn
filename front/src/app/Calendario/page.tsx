"use client";
import React, { useContext, useEffect, useState } from "react";
import CreateEventForm from "../../components/CitaCalendario/FormCita";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import Image from "next/image";
import Link from "next/link";
import { Button_Menu } from "@/components/ui/Buttons";
import { UserContext } from "@/context/userContext"; // Asegúrate de que esta ruta sea correcta
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CalendarPage = () => {
  const { isAuthenticated } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Para acceder a esta sección, debes estar logueado.",
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
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return null; // Puedes mostrar un spinner o un mensaje de carga aquí
  }

  return (
    <div>
      <div>
        <Link href="/Menu">
          <Button_Menu />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
          className="mt-2"
        />
        <h1 className="text-3xl font-bold text-center mt-4">
          Reserva la cita en CASHIN
        </h1>

        <div className="flex flex-col items-center justify-center mt-20">
          <CreateEventForm />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
