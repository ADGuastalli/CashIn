"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import validateMail from "../../helpers/validations.login";
import { Label } from "../ui/Label";
import Swal from "sweetalert2";

interface IErrors {
  user_name?: string;
  user_email?: string;
  message?: string;
}

interface UserData {
  user_name: string;
  user_email: string;
  message: string;
}

function ContactMail() {
  const [userData, setUserData] = useState<UserData>({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [errors, setErrors] = useState<IErrors>({
    user_name: "",
    user_email: "",
    message: "",
  });

  const form = useRef<HTMLFormElement>(null);

  const todosLosCamposCompletos = (): boolean => {
    return Object.values(userData).every((value) => value.trim() !== "");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const newUserData = { ...userData, [name]: value };
    setUserData(newUserData);
    setErrors(
      validateMail(newUserData, ["user_name", "user_email", "message"])
    );
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current && todosLosCamposCompletos()) {
      try {
        await emailjs.sendForm(
          "service_8fjucgc",
          "template_la3z4js",
          form.current,
          "bvYj04WLCrWhp38gm"
        );
        Swal.fire({
          title: "¡Enviado!",
          text: "Tu mensaje ha sido enviado exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo más tarde.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const renderInputField = (
    id: string,
    name: keyof UserData,
    type: string,
    label: string
  ) => (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        className="block py-2.5 px-0 w-full text-sm border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0"
        type={type}
        name={name}
        id={id}
        onChange={handleInputChange}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-5">
        ¿Quieres enviarnos un mensaje?
      </h2>
      <form ref={form} onSubmit={sendEmail}>
        {renderInputField(
          "name",
          "user_name",
          "text",
          "Nombre/s y Apellido/s:"
        )}
        {renderInputField("email", "user_email", "email", "Email:")}
        <div>
          <Label htmlFor="message">Mensaje:</Label>
          <textarea
            className="block py-2.5 px-0 w-full text-sm mt-10 border border-black rounded-xl"
            id="message"
            name="message"
            onChange={handleInputChange}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        {!todosLosCamposCompletos() && (
          <p className="text-red-500 text-sm mt-2">
            * Todos los campos son obligatorios
          </p>
        )}
        <div className="flex justify-center mt-4">
          <input
            disabled={!todosLosCamposCompletos()}
            className="disabled:opacity-50 disabled:cursor-not-allowed m-4 flex justify-center w-full bg-actions  text-aux_actions 
         py-2 px-4 mx-2 mt-10 rounded-sm"
            type="submit"
            value="Enviar"
          />
        </div>
      </form>
    </div>
  );
}

export default ContactMail;
