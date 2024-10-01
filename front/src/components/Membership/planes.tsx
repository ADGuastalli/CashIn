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
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Funcionalidades</th>
            <th className="border px-4 py-2">Opción Gratuita</th>
            <th className="border px-4 py-2">Opción Premium</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Precios</td>
            <td className="border px-4 py-2 text-center">US$0</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              US$5 - Mensual
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Consultas al Chatbot IA</td>
            <td className="border px-4 py-2 text-center">5 (al mes)</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              100 (al mes)
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Cantidad de Usuarios</td>
            <td className="border px-4 py-2 text-center">SI</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Seguimiento y Control de Gastos
            </td>
            <td className="border px-4 py-2 text-center">SI</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Simulación y creación de presupuestos
            </td>
            <td className="border px-4 py-2 text-center">SI</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Herramientas de educación financiera
            </td>
            <td className="border px-4 py-2 text-center">X</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Simulación y cálculo de ahorros e inversiones
            </td>
            <td className="border px-4 py-2 text-center">X</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Plan de Pago de Deuda</td>
            <td className="border px-4 py-2 text-center">X</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Diagnóstico y análisis financiero
            </td>
            <td className="border px-4 py-2 text-center">X</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Planificación de metas financieras
            </td>
            <td className="border px-4 py-2 text-center">X</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Soporte Prioritario</td>
            <td className="border px-4 py-2 text-center">X</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Acceso para Múltiples Usuarios</td>
            <td className="border px-4 py-2 text-center">X</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              X
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Informes y Estados Personalizados
            </td>
            <td className="border px-4 py-2 text-center">X</td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              SI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">
              <button className="cursor-auto text-center font-bold h-14 w-full px-3 bg-gray-300 rounded">
                Membresia gratuita
              </button>
            </td>
            <td className="border px-4 py-2 bg-yellow-50">
              <button
                onClick={handlePurchaseClick}
                className="text-center font-bold h-14 w-full bg-yellow-200 rounded"
              >
                COMPRAR
              </button>
              {showPaypalButton && (
                <div className="mt-5">
                  <Button_Paypal
                    orderDetails={paypalOrderDetails}
                    paymentType="membership"
                  />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
