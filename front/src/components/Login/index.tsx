"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { ILogin, IErrorsLogin } from "@/interface/interfaceUser";
import { UserContext } from "../../context/userContext";
import { validateLogin } from "../../helpers/validations.login";
import eye from "../../public/assets/svg/eye-svgrepo-com.svg";
import eyeClouse from "../../public/assets/svg/eye-slash-svgrepo-com.svg";
import Image from "next/image";

export default function LoginComponent() {
  const { login } = useContext(UserContext);
  const router = useRouter();
  const [userData, setUserData] = useState<ILogin>({
    username: "",
    password: "",
  } as ILogin);

  const [errors, setErrors] = useState<IErrorsLogin>({
    username: "*",
    password: "*",
  } as IErrorsLogin);

  const [showPassword, setShowPassword] = useState(false);

  const todosLosCamposRequeridos = () => {
    return userData.username !== "" && userData.password !== "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newUserData = {
      ...userData,
      [name]: value,
    };
    setUserData(newUserData);
    setErrors(validateLogin(newUserData, ["username", "password"]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await login(userData);
      if (success) {
        Swal.fire({
          title: "¡Login Exitoso!",
          text: "Serás redirigido en 3 segundos...",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        Swal.fire({
          title: "Error",
          text: "Usuario o contraseña no encontrados.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
          customClass: {
            confirmButton: "button-error",
          },
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "button-error",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-6 flex flex-col items-center justify-center rounded">
        <input
          type="text"
          name="username"
          className="relative block w-[300px] rounded bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#77DD77] transition duration-150 ease-in-out text-center border border-[#89E186]"
          id="username"
          placeholder="Username"
          onChange={handleInputChange}
        />
        <div className="h-4 w-full">
          {errors.username && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.username}
            </p>
          )}
        </div>
      </div>

      <div className="relative mb-6 flex flex-col items-center rounded">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          className="relative block w-[300px] rounded bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#77DD77] transition duration-150 ease-in-out text-center border border-[#89E186]"
          id="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-3 text-gray-600"
        >
          <Image
            src={showPassword ? eye : eyeClouse}
            alt="Toggle visibility"
            className="w-6 h-6"
          />
        </button>
        <div className="h-4 w-full">
          {errors.password && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      <div className="h-4">
        {!todosLosCamposRequeridos() && (
          <p className="text-red-600 text-xs text-left w-full pl-3">
            * Todos los campos son requeridos
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className={
            todosLosCamposRequeridos() ? "button-principal" : "button-inactivo"
          }
          data-twe-ripple-init
          data-twe-ripple-color="light"
          disabled={!todosLosCamposRequeridos()}
        >
          Ingresar
        </button>
      </div>
    </form>
  );
}
