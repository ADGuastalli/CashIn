"use client";
import React, { useEffect, useState } from "react";
import { IUserProfile } from "@/interface/interfaceUser";
import { validateForm } from "@/helpers/validations.login";
import Swal from "sweetalert2";
import { updateUserProfile } from "@/server/fetchUserFormProfile";
import { useRouter } from "next/navigation";
import { Label_profile } from "../ui/Label";
import { Input_profile } from "../ui/Input";
import { Button_actions } from "../ui/Buttons";
import { getAllCountries } from "@/server/fetchCountry";
import ICity, { getAllCities } from "@/server/fetchCity";
import { getAllMaritalStatuses } from "@/server/fetchMAterialStatus";
import IOccupation, { getAllOccupations } from "@/server/fechtOcupation";
import { getAllDwellings } from "@/server/fetchDwelling";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function FormProfile({ DataUser }: { DataUser: IUserProfile }) {
  const { setUserProfile, setIsProfileComplete } = useContext(UserContext);
  const router = useRouter();

  const [formData, setFormData] = useState<IUserProfile>({
    user_id: DataUser.user_id,
    user_name: DataUser.user_name || "",
    last_name: DataUser.last_name || "",
    city_id: DataUser.city_id || "",
    country_id: DataUser.country_id || "",
    email: DataUser.email || "",
    birthdate: DataUser.birthdate || "",
    occupation_id: DataUser.occupation_id,
    marital_status_id: DataUser.marital_status_id,
    dwelling_id: DataUser.dwelling_id,
    child: DataUser.child || 0,
    premium: DataUser.premium || false,
    admin: DataUser.admin || false,
  });

  const [hasChildren, setHasChildren] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countries, setCountries] = useState<
    { country_id: string; country: string }[]
  >([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await getAllCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const [citys, setCitys] = useState<ICity[]>([]);

  useEffect(() => {
    const fetchCitys = async () => {
      try {
        const citysData = await getAllCities();
        setCitys(citysData);
      } catch (error) {
        console.error("Error fetching citys:", error);
      }
    };
    fetchCitys();
  }, []);

  const [ocupations, setOccupations] = useState<IOccupation[]>([]);

  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const OccupationsData = await getAllOccupations();
        setOccupations(OccupationsData);
      } catch (error) {
        console.error("Error fetching Occupations:", error);
      }
    };
    fetchOccupations();
  }, []);

  const [materialStatus, setMaterialStatus] = useState<
    { marital_status_id: string; marital_status: string }[]
  >([]);

  useEffect(() => {
    const fetchMaterialStatus = async () => {
      try {
        const materialStatusData = await getAllMaritalStatuses();
        setMaterialStatus(materialStatusData);
      } catch (error) {
        console.error("Error fetching materialStatus:", error);
      }
    };
    fetchMaterialStatus();
  }, []);

  const [dwellings, setDwellings] = useState<
    { dwelling_id: string; dwelling: string }[]
  >([]);

  useEffect(() => {
    const fetchDwellings = async () => {
      try {
        const dwellingsData = await getAllDwellings();
        setDwellings(dwellingsData);
      } catch (error) {
        console.error("Error fetching dwellings:", error);
      }
    };
    fetchDwellings();
  }, []);

  const todosLosCamposRequeridos = () => {
    return (
      formData.user_name !== "" &&
      formData.last_name !== "" &&
      formData.email !== "" &&
      formData.country_id !== "" &&
      formData.city_id !== "" &&
      formData.birthdate !== "" &&
      formData.dwelling_id !== "" &&
      formData.marital_status_id !== "" &&
      formData.occupation_id !== undefined &&
      (!hasChildren || (formData.child > 0 && formData.child !== undefined))
    );
  };

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

  const handleCheckboxChange = () => {
    setHasChildren((prev) => !prev);
    if (hasChildren) {
      setFormData((prev) => ({ ...prev, child: 0 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      const token =
        typeof window !== "undefined" && localStorage.getItem("token");
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
          console.log("datos enviamos al back", formData);

          const response = await updateUserProfile(formData, token);

          if (response.ok) {
            const updatedUserProfile = await response.json();

            // Actualizar el contexto con el perfil actualizado
            setUserProfile(updatedUserProfile.user); // Aquí actualizas el perfil en el contexto
            setIsProfileComplete(true); // Marcar que el perfil está completo

            Swal.fire("Perfil actualizado", "", "success");
            setErrors({});
            router.push("/Menu");
          } else {
            const errorData = await response.json();
            console.error("Error submitting user data:", errorData.message);
            Swal.fire("Error", errorData.message, "error");
          }
        }
      } catch (error) {
        console.error("Request failed", error);
        Swal.fire(
          "Error",
          "Ha ocurrido un error al actualizar el perfil",
          "error"
        );
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
        <Label_profile>Name:</Label_profile>
        <Input_profile
          type="text"
          name="user_name"
          value={formData.user_name || ""}
          onChange={handleChange}
          required
        />
        <div className="h-4 w-full">
          {errors.user_name && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.user_name}
            </p>
          )}
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Last Name:</Label_profile>
        <Input_profile
          type="text"
          name="last_name"
          value={formData.last_name || ""}
          onChange={handleChange}
          required
        />
        <div className="h-4 w-full">
          {errors.last_name && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.last_name}
            </p>
          )}
        </div>
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
        <div className="h-4 w-full">
          {errors.email && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Country:</Label_profile>
        <select
          name="country_id"
          value={formData.country_id}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        >
          <option value="">Seleccione un país</option>
          {countries.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              {country.country}
            </option>
          ))}
        </select>
        <div className="h-4 w-full">
          {errors.country_id && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.country_id}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>City:</Label_profile>
        <select
          name="city_id"
          value={formData.city_id}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-text_color bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer "
        >
          <option value="">Seleccione una ciudad</option>
          {citys.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city}
            </option>
          ))}
        </select>
        <div className="h-4 w-full">
          {errors.city_id && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.city_id}
            </p>
          )}
        </div>
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
        <div className="h-4 w-full">
          {errors.birthdate && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.birthdate}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Situacion laboral:</Label_profile>
        <select
          name="occupation_id"
          value={formData.occupation_id || ""}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-text_color bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer "
        >
          <option value="">Seleccione una Ocupacion</option>
          {ocupations.map((occupation) => (
            <option
              key={occupation.occupation_id}
              value={occupation.occupation_id}
            >
              {occupation.occupation}
            </option>
          ))}
        </select>
        <div className="h-4 w-full">
          {errors.occupational_id && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.occupational_id}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Estado civil:</Label_profile>
        <select
          name="marital_status_id"
          value={formData.marital_status_id || ""}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-text_color bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer "
        >
          <option value="">Seleccione un estado civil</option>
          {materialStatus.map((material_status) => (
            <option
              key={material_status.marital_status_id}
              value={material_status.marital_status_id}
            >
              {material_status.marital_status}
            </option>
          ))}
        </select>
        <div className="h-4 w-full">
          {errors.marital_status_id && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.marital_status_id}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group mt-4">
        <Label_profile>Situacion habitacional:</Label_profile>
        <select
          name="dwelling_id"
          value={formData.dwelling_id || ""}
          onChange={handleChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-text_color bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer "
        >
          <option value="">Se encuentra viviendo solo/a</option>
          {dwellings.map((dwelling) => (
            <option key={dwelling.dwelling_id} value={dwelling.dwelling_id}>
              {dwelling.dwelling}
            </option>
          ))}
        </select>
        <div className="h-4 w-full">
          {errors.dwelling_id && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.dwelling_id}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center h-5">
        <input
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
          type="checkbox"
          onChange={handleCheckboxChange}
        />
        <label className="ms-2 text-sm font-medium text-gray-900 ">
          ¿Tienes hijos?
        </label>
      </div>

      {hasChildren && (
        <div className="relative z-0 w-full mb-6 group mt-4">
          <Label_profile>Number of Children:</Label_profile>
          <Input_profile
            type="number"
            name="child"
            value={formData.child || 0}
            onChange={handleChange}
            min="0"
            required
          />
          <div className="h-4 w-full">
            {errors.child && (
              <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
                {errors.child}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="mt-4">
        {!todosLosCamposRequeridos() && (
          <p className="text-red-600 text-xs text-left w-full pl-3">
            * Todos los campos son requeridos
          </p>
        )}
      </div>
      <Button_actions type="submit">Submit</Button_actions>
    </form>
  );
}

export default FormProfile;
