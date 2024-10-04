const fetch = require("node-fetch");
const { User } = require("../../models/index");
// Función para obtener el token de acceso
async function createAccessToken() {
  const clientId = process.env.CLIENT_PAYPAL;

  const clientSecret = process.env.CLIENT_SECRET_PAYPAL;

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
async function createOrder(amount, description) {
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
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD", // Código de moneda en formato ISO 4217
                value: amount, // Valor dinámico desde el frontend
              },
              description: description, // Descripción de la orden
              reference_id: "unique-ref-id", // Valor único por orden
            },
          ],
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
// Controlador de la ruta para crear la orden de PayPal
const createPaypalOrder = async (req, res) => {
  const { amount, description } = req.body; // Obtener amount y description desde el body

  try {
    const order = await createOrder(amount, description); // Pasar los valores a createOrder
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
// Controlador para capturar la orden aprobada por el cliente
const capturePaypalOrder = async (req, res) => {
  const { orderID, userId } = req.body; // Asegúrate de que el ID del usuario se pase desde el frontend

  try {
    const captureData = await captureOrder(orderID);

    if (captureData.status === "COMPLETED") {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      user.premium = true;
      user.premium_expiration = new Date(); // Establece la fecha actual
      user.premium_expiration.setMonth(user.premium_expiration.getMonth() + 1); /// Cambia el estado a premium
      await user.save(); // Guarda los cambios en la base de datos
    }

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
