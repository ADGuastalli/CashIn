"use client";
import { useContext } from "react";
import { UserContext } from "../../context/userContext"; // Ajusta el path según sea necesario
import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { API } from "@/helpers/helper";
import Swal from "sweetalert2"; // Importa SweetAlert2

interface PayPalApproveData {
  orderID: string;
}

interface PayPalError {
  message?: string;
  name?: string;
}

interface OrderData {
  id: string;
  details?: Array<{
    issue: string;
    description: string;
  }>;
  debug_id?: string;
}

interface PayPalActions {
  redirect(url: string): void;
}

const Button_Paypal = ({
  orderDetails,
  paymentType,
}: {
  orderDetails: { amount: number; description: string };
  paymentType: "membership" | "appointment";
}) => {
  const { userProfile, setUserProfile } = useContext(UserContext);
  console.log("perfil", userProfile);

  const initialOptions: ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_ID as string,
  };

  const createOrder = async () => {
    try {
      const response = await fetch(`${API}/my-server/create-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: orderDetails.amount,
          description: orderDetails.description,
        }),
      });

      const orderData: OrderData = await response.json();

      if (!orderData.id) {
        const errorDetail = orderData.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";

        throw new Error(errorMessage);
      }

      console.log("Respuesta del backend", orderData);
      return orderData.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data: PayPalApproveData, actions: PayPalActions) => {
    try {
      console.log("Aprobación de PayPal, datos:", data);
      console.log("userid", userProfile.user_id);

      const response = await fetch(`${API}/my-server/capture-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderID: data.orderID,
          userId: userProfile?.user_id,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error en la captura de la orden: ${response.statusText}`
        );
      }

      const details = await response.json();
      console.log("Detalles de la transacción capturada:", details);

      // Actualizar el estado del usuario a premium
      setUserProfile({
        ...userProfile,
        premium: true,
      });

      if (paymentType === "membership") {
        return actions.redirect("http://localhost:3000/Menu");
      } else if (paymentType === "appointment") {
        return actions.redirect("http://localhost:3000/Calendario");
      }
    } catch (error) {
      console.error("Error en la captura de PayPal:", error);

      const errorMessage =
        (error as { message?: string }).message || "Error desconocido";

      Swal.fire({
        title: "Error",
        text: `Hubo un error: ${errorMessage}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onCancel = (data: object, actions: Record<string, unknown>) => {
    Swal.fire({
      title: "Transacción cancelada",
      text: "Has cancelado la transacción",
      icon: "info",
      confirmButtonText: "OK",
    });
    if (actions.redirect && typeof actions.redirect === "function") {
      return actions.redirect("/Menu");
    } else {
      console.error('La propiedad "redirect" no existe en el objeto "actions"');
    }
  };

  const onError = (err: PayPalError) => {
    console.error("Error de PayPal:", err);

    Swal.fire({
      title: "Error de PayPal",
      text: `Hubo un error: ${err.message || "Error desconocido"}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default Button_Paypal;
