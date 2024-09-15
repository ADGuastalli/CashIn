"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { validateRegister } from "../../helpers/validations.login";
import { IErrorsRegister } from "@/interface/interfaceUser";
import { UserContext } from "../../context/userContext";
import eye from "../../public/assets/svg/eye-svgrepo-com.svg";
import eyeClouse from "../../public/assets/svg/eye-slash-svgrepo-com.svg";
import Image from "next/image";
import Swal from "sweetalert2";
import { Input } from "../ui/Input";

export default function RegisterComponent() {
  const { register } = useContext(UserContext);
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<IErrorsRegister>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const todosLosCamposCompletos = () => {
    return (
      userData.name !== "" &&
      userData.email !== "" &&
      userData.password !== "" &&
      userData.confirmPassword !== ""
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue =
      name === "birthdate"
        ? new Date(value).toISOString().split("T")[0]
        : value;
    const newUserData = { ...userData, [name]: newValue };

    setUserData(newUserData);
    setErrors(
      validateRegister(newUserData, [
        "name",
        "email",
        "password",
        "confirmPassword",
      ])
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
        customClass: {
          confirmButton: "button-error",
        },
      });
    } else {
      const userDataToSubmit = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        role: "userfree",
      };
      try {
        const success = await register(userDataToSubmit);

        if (success) {
          Swal.fire({
            icon: "success",
            title: "¡Registrado con Exito!",
            text: "Usuario registrado con exitosamente, por favor ingresar con sus credenciales",
            customClass: {
              confirmButton: "button-principal",
            },
          }).then(() => {
            // CAMBIAR A LA RUTA PARA COMPLETAR LOS DEMAS CAMPOS
            router.push("/User/Login");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al registrar usuario",
            customClass: {
              confirmButton: "button-error",
            },
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error en el servidor, por favor intente nuevamente",
          customClass: {
            confirmButton: "button-error",
          },
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "name", placeholder: "Apellido/s y Nombre/s" },
          { name: "email", placeholder: "Email" },
          {
            name: "password",
            placeholder: "Password",
            type: showPassword ? "text" : "password",
            toggleShow: () => setShowPassword((prev) => !prev),
          },
          {
            name: "confirmPassword",
            placeholder: "Confirmar Password",
            type: showConfirmPassword ? "text" : "password",
            toggleShow: () => setShowConfirmPassword((prev) => !prev),
          },
        ].map(({ name, placeholder, type = "text", toggleShow }) => (
          <div
            key={name}
            className="relative flex flex-col items-start rounded"
          >
            <Input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              onChange={handleInputChange}
            />
            {name === "password" || name === "confirmPassword" ? (
              <button
                type="button"
                onClick={toggleShow}
                className="absolute right-3 top-3 text-gray-600"
              >
                <Image
                  src={type === "password" ? eye : eyeClouse}
                  alt="Toggle visibility"
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
              </button>
            ) : null}
            <div className="h-[1rem] w-full">
              {errors[name as keyof IErrorsRegister] && (
                <p className="text-red-600 text-xs text-left pl-3 mt-1">
                  {errors[name as keyof IErrorsRegister]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {!todosLosCamposCompletos() && (
        <p className="text-red-600 text-xs text-left pl-3 min-h-[1rem] mt-3">
          * Todos los campos son requeridos
        </p>
      )}

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className={
            todosLosCamposCompletos() ? "button-principal" : "button-inactivo"
          }
          data-twe-ripple-init
          data-twe-ripple-color="light"
          disabled={!todosLosCamposCompletos()}
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}
