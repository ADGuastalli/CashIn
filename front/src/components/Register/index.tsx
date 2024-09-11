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

export default function RegisterComponent() {
  const { register } = useContext(UserContext);
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    birthdate: "",
  });

  const [errors, setErrors] = useState<IErrorsRegister>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    birthdate: "",
    status: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const todosLosCamposCompletos = () => {
    return (
      userData.name !== "" &&
      userData.username !== "" &&
      userData.email !== "" &&
      userData.password !== "" &&
      userData.confirmPassword !== "" &&
      userData.country !== "" &&
      userData.city !== "" &&
      userData.birthdate !== ""
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
        "username",
        "email",
        "password",
        "confirmPassword",
        "country",
        "city",
        "birthdate",
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
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        country: userData.country,
        city: userData.city,
        birthdate: userData.birthdate,
        status: true,
        role: "user",
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
          { name: "country", placeholder: "Pais" },
          { name: "city", placeholder: "Ciudad" },
          {
            name: "birthdate",
            placeholder: "Fecha de Nacimiento",
            type: "date",
          },
          { name: "username", placeholder: "Username" },
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
            <input
              type={type}
              name={name}
              className="block w-96 rounded bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#77DD77] transition duration-150 ease-in-out border border-[#89E186]"
              id={name}
              placeholder={placeholder}
              onChange={handleInputChange}
            />
            {/* Agregar icono de mostrar/ocultar contraseña */}
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
