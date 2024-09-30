const fetch = require("node-fetch");

// Función para obtener el token de acceso
async function createAccessToken() {
  const clientId =
    "AZgr39IXh57tZLM9B_aBH0CTCiLdUg51dX3fJ5pFCWJvuymlTfZNmyDLs5JuGicN8D5eBcyArph13jrr"; // Reemplaza con tu Client ID
  const clientSecret =
    "EIyCXCFhOuvQhJWNTNZ9NC749TH0ssbifMAb7G2vzK2hif45FWRlVRGbIBpyCden0u_ryII6pIJpawhf"; // Reemplaza con tu Client Secret

  try {
    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization:
            "Basic " +
            Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error al obtener el token de acceso: ${data.message}`);
    }

    console.log("Token de acceso obtenido:", data);
    return data.access_token;
  } catch (error) {
    console.error("Error al obtener el token de acceso:", error.message);
    throw error;
  }
}

// Función para crear la orden de PayPal
async function createOrder() {
  try {
    const accessToken = await createAccessToken();

    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: "2.00",
              },
              reference_id: "d9fsdas80740-38f0-1sdas1e8-b467-0ed5f89f71das8b", // Reemplázalo por tu propio valor de referencia
            },
          ],
          intent: "CAPTURE", // Asegura que es un pago inmediato
          payment_source: {
            paypal: {
              experience_context: {
                payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                payment_method_selected: "PAYPAL",
                brand_name: "EXAMPLE INC", // Reemplaza con el nombre de tu negocio
                locale: "en-US",
                landing_page: "LOGIN",
                shipping_preference: "GET_FROM_FILE",
                user_action: "PAY_NOW",
                return_url: "https://example.com/returnUrl", // Reemplaza con tu URL de retorno
                cancel_url: "https://example.com/cancelUrl", // Reemplaza con tu URL de cancelación
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error en la creación de la orden: ${error.message}`);
    }

    const order = await response.json();
    console.log("Orden creada:", order);
    return order;
  } catch (error) {
    console.error("Error al crear la orden de PayPal:", error.message);
    throw error;
  }
}

async function captureOrder(orderID) {
  try {
    const accessToken = await createAccessToken();

    const response = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error en la captura de la orden: ${error.message}`);
    }

    const captureData = await response.json();
    console.log("Pago capturado:", captureData);
    return captureData;
  } catch (error) {
    console.error("Error al capturar la orden:", error.message);
    throw error;
  }
}

// Controlador de la ruta para crear la orden de PayPal
const createPaypalOrder = async (req, res) => {
  try {
    const order = await createOrder();
    res.json({ id: order.id });
  } catch (error) {
    console.error("Error al crear el pedido de PayPal:", error.message);
    res.status(500).json({
      error: "Error al crear el pedido de PayPal",
      message: error.message,
    });
  }
};

// Controlador para capturar la orden aprobada por el cliente
const capturePaypalOrder = async (req, res) => {
  const { orderID } = req.body;

  try {
    const captureData = await captureOrder(orderID);
    res.json(captureData); // Envía los datos de la transacción capturada al frontend
  } catch (error) {
    console.error("Error al capturar el pedido de PayPal:", error.message);
    res.status(500).json({
      error: "Error al capturar el pedido de PayPal",
      message: error.message,
    });
  }
};

module.exports = { createPaypalOrder, capturePaypalOrder };
