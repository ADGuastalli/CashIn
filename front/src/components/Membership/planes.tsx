"use client";
import React, { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // Importar el router para manejar la redirección
import Button_Paypal from "../Paypal";

export default function PlanesComponet() {
  const [showPaypalButton, setShowPaypalButton] = useState(false);
  const [paypalOrderDetails, setPaypalOrderDetails] = useState({
    amount: 5.0,
    description: "Membresia Premium",
  });
  const { isAuthenticated } = useContext(UserContext); // Obtener el estado de autenticación
  const router = useRouter(); // Crear la instancia del router

  // Función para manejar el clic en el botón "COMPRAR"
  const handlePurchaseClick = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Debes estar logueado para comprar la membresía premium.",
        icon: "warning",
        confirmButtonText: "Ir a Login",
        allowOutsideClick: false,
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/User/Login"); // Redirigir al login si no está autenticado
        }
      });
    } else {
      setShowPaypalButton(true);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Columna 1 - Funcionalidades */}
      <div className="space-y-4 p-4">
        <div className="text-left text-xl font-bold">Funcionalidades</div>
        <div className="text-left">Precios</div>
        <div className="text-left">Consultas al Chatbot IA</div>
        <div className="text-left">Cantidad de Usuarios</div>
        <div className="text-left">Seguimiento y Control de Gastos</div>
        <div className="text-left">Simulación y creación de presupuestos</div>
        <div className="text-left">Herramientas de educación financiera</div>
        <div className="text-left">
          Simulación y cálculo de ahorros e inversiones
        </div>
        <div className="text-left">Plan de Pago de Deuda</div>
        <div className="text-left">Diagnóstico y análisis financiero</div>
        <div className="text-left">Planificación de metas financieras</div>
        <div className="text-left">Soporte Prioritario</div>
        <div className="text-left">Acceso para Múltiples Usuarios</div>
        <div className="text-left">Informes y Estados Personalizados</div>
      </div>

      {/* Columna 2 - Opción Gratuita */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-4">
        <div className="text-center text-xl font-bold">Opción Gratuita</div>
        <div className="text-center">US$0</div>
        <div className="text-center">5 (al mes)</div>
        <div className="text-center">SI</div>
        <div className="text-center">SI</div>
        <div className="text-center">SI</div>
        <div className="text-center">X</div>
        <div className="text-center">X</div>
        <div className="text-center">X</div>
        <div className="text-center">X</div>
        <div className="text-center">X</div>
        <div className="text-center">X</div>
        <div className="text-center">X</div>
        <div className="text-center">X</div>
        <button className="cursor-auto text-center font-bold h-14 mt-4 w-full bg-gray-300 rounded">
          Membresia gratuita
        </button>
      </div>

      {/* Columna 3 - Opción Premium */}
      <div className="bg-yellow-100 rounded-lg p-4 shadow-xl space-y-4 transform transition-transform duration-300 ease-in-out hover:scale-105 ">
        <div className="text-center text-lg font-bold">Opción Premium</div>
        <div className="text-center font-bold">US$5 - Mensual</div>
        <div className="text-center font-bold">100 (al mes)</div>
        <div className="text-center font-bold">SI</div>
        <div className="text-center font-bold">SI</div>
        <div className="text-center font-bold">SI</div>
        <div className="text-center font-bold">SI</div>
        <div className="text-center font-bold">SI</div>
        <div className="text-center font-bold">SI</div>
        <div className="text-center font-bold">SI</div>
        <div className="text-center font-bold">SI</div>
        <div className="text-center font-bold">SI</div>
        <div className="text-center font-bold">X</div>
        <div className="text-center font-bold">SI</div>
        <button
          onClick={handlePurchaseClick}
          className="text-center font-bold h-14 mt-4 w-full bg-yellow-200 rounded"
        >
          COMPRAR
        </button>
        <div className="mt-5">
          {showPaypalButton && (
            <Button_Paypal
              orderDetails={paypalOrderDetails}
              paymentType="membership"
            />
          )}
        </div>
      </div>
    </div>
  );
}
