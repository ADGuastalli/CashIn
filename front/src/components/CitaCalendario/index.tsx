"use client";
import React, { useState, useContext, useEffect } from "react";
import { Button_action } from "../ui/Buttons";
import Button_Paypal from "../Paypal";
import { UserContext } from "@/context/userContext"; // Asegúrate de que esta ruta sea correcta
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function ConcretarCita() {
  const [showPaypalButton, setShowPaypalButton] = useState(false);
  const [paypalOrderDetails, setPaypalOrderDetails] = useState({
    amount: 2.0, // Set the value to 2 dollars
    description: "Solicitud de cita", // Description of the appointment
  });
  const { isAuthenticated } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Para solicitar una cita, debes estar logueado.",
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

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Para solicitar una cita, debes estar logueado.",
        icon: "warning",
        confirmButtonText: "Ir a Login",
        allowOutsideClick: false,
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/User/Login");
        }
      });
      return; // Salir de la función si no está autenticado
    }

    // Si el usuario está autenticado, mostrar el botón de PayPal
    setShowPaypalButton(true);
    setPaypalOrderDetails({
      amount: 2.0,
      description: "Solicitud de cita para ", // Puedes añadir detalles dinámicos aquí
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mx-4">
      <Button_action onClick={handleButtonClick}>
        Solicitar una Cita
      </Button_action>
      <div className="mt-5">
        {showPaypalButton && (
          <Button_Paypal
            orderDetails={paypalOrderDetails}
            paymentType="appointment"
          />
        )}
      </div>
      <div className="mt-10 flex flex-col items-center justify-center mx-auto max-w-2xl">
        <p className="text-lg">
          En CASHIN, entendemos lo importante que es tomar decisiones
          financieras informadas. Por eso, te ofrecemos la oportunidad de
          concertar una cita personalizada con nuestra asesora financiera, Luz
          Angeles Jiménez. Con su amplia experiencia y conocimientos en el mundo
          financiero, Luz está lista para ayudarte a alcanzar tus objetivos
          económicos.
        </p>
        <p className="font-semibold my-5">¿Cómo funciona? Reserva tu Cita:</p>
        <p>
          Elige la fecha y hora que mejor se adapte a tu agenda. Puedes hacerlo
          a través de nuestro sitio web.
        </p>
        <p className="mt-2">
          Pago Seguro: Por solo US$ 2.00, podrás acceder a una consulta
          individual con Luz. Aceptamos diferentes formas de pago, incluyendo
          PayPal.
        </p>
        <p className="mt-2">
          Preparación: Antes de la cita, te recomendamos que reúnas toda la
          información relevante sobre tus finanzas y tus metas. Esto nos
          permitirá aprovechar al máximo el tiempo juntos.
        </p>
        <p className="mt-2">
          Asesoramiento Personalizado: Durante la cita, Luz analizará tu
          situación financiera, responderá tus preguntas y te proporcionará
          recomendaciones específicas. Ya sea que estés buscando invertir,
          planificar tu jubilación o resolver dudas sobre impuestos, ella estará
          allí para guiarte.
        </p>
        <p className="mt-2 font-bold">
          ¡No esperes más! Reserva tu cita con Luz Angeles Jiménez y da el
          primer paso hacia una mejor salud financiera.
        </p>
      </div>
    </div>
  );
}
