"use client";
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

const Button_Paypal = () => {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId:
      "AZgr39IXh57tZLM9B_aBH0CTCiLdUg51dX3fJ5pFCWJvuymlTfZNmyDLs5JuGicN8D5eBcyArph13jrr",
  };

  const createOrder = async () => {
    try {
      const response = await fetch(`${API}/my-server/create-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
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

      const response = await fetch(`${API}/my-server/capture-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error en la captura de la orden: ${response.statusText}`
        );
      }

      const details = await response.json();
      console.log("Detalles de la transacción capturada:", details);

      // Mostrar alerta de éxito y redirigir a /Calendario
      await Swal.fire({
        title: "Transacción completada",
        text: `Transacción completada por ${details.payer.name.given_name}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      // Redirigir a /Calendario después de cerrar la alerta
      window.location.assign("/Calendario");
    } catch (error) {
      console.error("Error en la captura de PayPal:", error);

      // Aserción de tipo para acceder a `message`
      const errorMessage =
        (error as { message?: string }).message || "Error desconocido";

      // Mostrar alerta de error
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

    // Mostrar alerta de error
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
