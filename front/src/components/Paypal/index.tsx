"use client";
import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { API } from "@/helpers/helper";

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

  const onApprove = async (data: any) => {
    try {
      console.log("Aprobación de PayPal, datos:", data);

      const response = await fetch(`${API}/my-server/capture-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderID: data.orderID, // Usa el orderID que recibes al aprobar el pago
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error en la captura de la orden: ${response.statusText}`
        );
      }

      const details = await response.json();
      console.log("Detalles de la transacción capturada:", details);

      alert(`Transacción completada por ${details.payer.name.given_name}`);
    } catch (error) {
      console.error("Error en la captura de PayPal:", error);
    }
  };
  const onCancel = () => {
    window.location.assign("/your-cancel-page");
  };

  const onError = (err: any) => {
    console.error("Error de PayPal:", err);
    alert(`Hubo un error: ${err.message || "Error desconocido"}`);
    window.location.assign("/your-error-page-here");
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
