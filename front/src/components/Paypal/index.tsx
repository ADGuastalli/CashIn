"use client";
import { useContext } from "react"; // Import useContext
import { UserContext } from "../../context/userContext"; // Adjust the path as necessary
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

// Define the shape of the error object from PayPal
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

const Button_Paypal = ({
  orderDetails,
  paymentType, // Nuevo prop para el tipo de pago
}: {
  orderDetails: { amount: number; description: string };
  paymentType: "membership" | "appointment"; // Puedes definir más tipos si es necesario
}) => {
  const { userProfile } = useContext(UserContext); // Get the user context

  const initialOptions: ReactPayPalScriptOptions = {
    clientId:
      "AZgr39IXh57tZLM9B_aBH0CTCiLdUg51dX3fJ5pFCWJvuymlTfZNmyDLs5JuGicN8D5eBcyArph13jrr",
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
      console.log("Respuesta del back", orderData);

      return orderData.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data: PayPalApproveData) => {
    try {
      console.log("Aprobación de PayPal, datos:", data);
      console.log("id de cambio de mebresia", userProfile.id);

      const response = await fetch(`${API}/my-server/capture-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderID: data.orderID,
          userId: userProfile?.id,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error en la captura de la orden: ${response.statusText}`
        );
      }

      const details = await response.json();
      console.log("Detalles de la transacción capturada:", details);

      await Swal.fire({
        title: "Transacción completada",
        text: `Transacción completada por ${details.payer.name.given_name}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      // Redireccionar según el tipo de pago
      if (paymentType === "membership") {
        window.location.assign("/Menu");
      } else if (paymentType === "appointment") {
        window.location.assign("/Calendario");
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

  const onCancel = () => {
    window.location.assign("/your-cancel-page");
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
