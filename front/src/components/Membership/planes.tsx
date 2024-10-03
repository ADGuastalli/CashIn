"use client";
import React, { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Button_Paypal from "../Paypal";

export default function PlanesComponet() {
  const [showPaypalButton, setShowPaypalButton] = useState(false);
  const paypalOrderDetails = {
    amount: 5.0,
    description: "Membresia Premium",
  };
  const { isAuthenticated, userProfile } = useContext(UserContext);
  const router = useRouter();

  const handlePurchaseClick = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Debes estar logueado para suscribirte a la membresía premium.",
        icon: "warning",
        confirmButtonText: "Ir a Login",
        allowOutsideClick: false,
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/User/Login");
        }
      });
    } else if (userProfile.premium) {
      // Verificar si el usuario ya es premium
      Swal.fire({
        title: "¡Ya eres un usuario premium!",
        text: "No necesitas suscribirte nuevamente.",
        icon: "info",
        confirmButtonText: "Aceptar",
      });
      setShowPaypalButton(false); // Asegurarse de no mostrar el botón de PayPal
    } else {
      setShowPaypalButton(true); // Mostrar el botón de PayPal si el usuario no es premium
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-separate">
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
            <td className="border px-4 py-2 text-center"> Ilimitado </td>
            <td className="border px-4 py-2 bg-yellow-100 text-lg text-center">
              Ilimitado
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
            <td className="px-4 py-2"></td>
            <td className=" px-4 py-2">
              <button className="cursor-auto text-center font-bold h-14 w-full px-3 bg-gray-300 rounded">
                Membresia gratuita
              </button>
            </td>
            <td className=" px-4 py-2">
              <button
                onClick={handlePurchaseClick}
                className="text-center font-bold h-14 w-full px-10 bg-yellow-200 rounded hover:scale-105 transition-transform duration-300"
              >
                SUSCRIBIRSE
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
