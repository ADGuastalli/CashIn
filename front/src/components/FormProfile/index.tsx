"use client";
import React, { useState } from "react";
import { IUserProfile } from "@/interface/interfaceUser";
import { validateForm } from "@/helpers/validations.login";
import Swal from "sweetalert2";
import { updateUserProfile } from "@/server/fetchUserFormProfile";
import { useRouter } from "next/navigation";
import { Label_profile } from "../ui/Label";
import { Input_profile } from "../ui/Input";
import { Button_actions } from "../ui/Buttons";

function FormProfile({ DataUser }: { DataUser: IUserProfile }) {
  const router = useRouter();

  const [formData, setFormData] = useState<IUserProfile>({
    id: DataUser.id || "",
    last_name: DataUser.last_name || "",
    city: DataUser.city || "",
    country: DataUser.country || "",
    email: DataUser.email || "",
    birthdate: DataUser.birthdate || "",
    ocupacion: DataUser.ocupacion,
    estadocivil: DataUser.estadocivil,
    hijos: DataUser.hijos || false,
    cantidad_de_hijos: DataUser.cantidad_de_hijos || 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const updatedData = {
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    };

    setFormData(updatedData);
    setErrors(validateForm(updatedData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      const token = localStorage.getItem("token");
      try {
        if (!token) {
          Swal.fire({
            title: "Deberías estar logueado",
            html: `
            Ir a  <b>Login</b>,
            <a href="/User/Login" autofocus>Acá</a>`,
            confirmButtonAriaLabel: "Aceptar",
          });
        } else {
          const response = await updateUserProfile(formData, token);
          if (response.ok) {
            Swal.fire("Perfil actualizado", "", "success");
            setErrors({});
            router.push("/Menu");
          } else {
            console.error("Error submitting user data");
          }
        }
      } catch (error) {
        console.error("Request failed", error);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Debes verificar los campos.",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mt-5">
      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Fist and Last Name:</Label_profile>
        <Input_profile
          type="text"
          name="last_name"
          value={formData.last_name || ""}
          onChange={handleChange}
          required
        />
        {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Email:</Label_profile>
        <Input_profile
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Country:</Label_profile>
        <Input_profile
          type="text"
          name="country"
          value={formData.country || ""}
          onChange={handleChange}
          required
        />
        {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>City:</Label_profile>
        <Input_profile
          type="text"
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
          required
        />
        {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Birthdate:</Label_profile>
        <Input_profile
          type="date"
          name="birthdate"
          value={formData.birthdate || ""}
          onChange={handleChange}
          required
        />
        {errors.birthdate && <p style={{ color: "red" }}>{errors.birthdate}</p>}
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Situacion laboral:</Label_profile>
        <select
          className="block py-2.5 px-0 w-full text-sm text-text_color bg-transparent border-0 border-b-2 border-gray-300 appearance-none
           focus:outline-none focus:ring-0 focus:border-blue-600 peer "
          name="ocupacion"
          value={formData.ocupacion || ""}
          onChange={handleChange}
        >
          <option>selecciona</option>
          <option value="independiente">Independiente</option>
          <option value="asalariado">Asalariado</option>
          <option value="contratista">Contratista</option>
          <option value="emprendedor">Emprendedor</option>
          <option value="ama de casa">Ama de Casa</option>
          <option value="estudiante">Estudiante</option>
        </select>
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Estado civil:</Label_profile>
        <select
          className="block py-2.5 px-0 w-full text-sm text-text_color bg-transparent border-0 border-b-2 border-gray-300 appearance-none
           focus:outline-none focus:ring-0 focus:border-blue-600 peer "
          name="estadocivil"
          value={formData.estadocivil || ""}
          onChange={handleChange}
        >
          <option>selecciona</option>
          <option value="independiente">Casado</option>
          <option value="asalariado">Soltero</option>
          <option value="contratista">Divorciado</option>
          <option value="emprendedor">Viudo</option>
        </select>
      </div>

      <div className="flex items-center h-5">
        <div className="flex items-center h-5">
          <input
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            type="checkbox"
            name="hijos"
            checked={formData.hijos}
            onChange={handleChange}
          />
        </div>
        <label className="ms-2 text-sm font-medium text-gray-900 ">
          ¿Tienes hijos?{" "}
        </label>
      </div>

      {formData.hijos && (
        <div className="relative z-0 w-full mb-6 group mt-4">
          <Label_profile>Number of Children:</Label_profile>
          <Input_profile
            type="number"
            name="cantidad_de_hijos"
            value={formData.cantidad_de_hijos || 0}
            onChange={handleChange}
            min="0"
            required
          />
          {errors.cantidad_de_hijos && (
            <p style={{ color: "red" }}>{errors.cantidad_de_hijos}</p>
          )}
        </div>
      )}

      <Button_actions type="submit">Submit</Button_actions>
    </form>
  );
}

export default FormProfile;
