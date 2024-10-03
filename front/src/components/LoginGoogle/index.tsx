"use client";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { API } from "@/helpers/helper";
import { useContext } from "react"; // Importa useContext
import { UserContext } from "@/context/userContext"; // Importa tu contexto

export default function LoginGoogle() {
  const router = useRouter();
  const { handleGoogleLogin } = useContext(UserContext);
  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const token = credentialResponse.credential;

    if (!token) {
      console.error("No se pudo obtener el token de Google");
      return;
    }

    try {
      // Send the Google token to the backend using fetch
      const response = await fetch(`${API}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      // Check for successful response
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Extract JWT token and user data
      const data = await response.json();
      const { token: jwtToken, user } = data;

      // Save JWT in localStorage
      typeof window !== "undefined" && localStorage.setItem("token", jwtToken);

      // Llama a handleGoogleLogin con los datos del usuario
      handleGoogleLogin(user); // Envía los datos del usuario al contexto

      // Redirige a la página deseada
      router.push("/Menu");
    } catch (error) {
      console.error("Error al autenticar con Google:", error);
    }
  };

  const handleGoogleFailure = () => {
    console.error("Error en la autenticación con Google:");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  );
}
