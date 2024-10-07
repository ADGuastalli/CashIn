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
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Estado para el pago exitoso

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
    } else if (paymentSuccess) {
      // Mostrar el mensaje de éxito solo si el pago fue exitoso
      Swal.fire({
        title: "El Pago fue exitoso",
        text: "Ahora puedes agendar tu cita en los turnos disponibles",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        showCloseButton: false,
      }).then((result) => {
        // Aquí no se realiza ninguna acción de redirección
        if (result.isConfirmed) {
          // Puedes realizar alguna acción adicional aquí si es necesario
        }
      });
    }
  }, [loading, isAuthenticated, paymentSuccess, router]);

  // Simulación de pago exitoso (esto debería ser manejado por tu lógica de pago)
  useEffect(() => {
    // Este código debe ejecutarse cuando el pago es exitoso
    const handlePaymentSuccess = () => {
      setPaymentSuccess(true);
    };

    handlePaymentSuccess(); // Simula un pago exitoso para pruebas

    return () => {
      setPaymentSuccess(false); // Limpia el estado cuando el componente se desmonta
    };
  }, []);

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
