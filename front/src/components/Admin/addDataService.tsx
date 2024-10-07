"use client";
import React, { useState, useEffect } from "react";
import { createService, getAllServices, IService } from "@/server/fetchService";
import {
  createDataService,
  IDataService,
  getAllDataService,
  deleteDataService,
} from "@/server/fetchDataService";
import { createBank, getAllBanks, IBank } from "@/server/fetchBank";
import Swal from "sweetalert2";
import { getAllCountries, ICountry } from "@/server/fetchCountry";

export default function AddDataService() {
  const [services, setServices] = useState<IService[]>([]);
  const [banks, setBanks] = useState<IBank[]>([]);
  const [dataService, setDataService] = useState<IDataService>({
    name: "",
    bank_id: "",
    service_id: 0,
    secuence: 0,
    opening_amount: 0,
    interest_rate: 0,
    requeriment: "",
    benefit_offered: "",
    trade_name: "",
    country_id: "",
  });
  const [newBank, setNewBank] = useState({ bank: "", country_id: "" });
  const [newServiceName, setNewServiceName] = useState("");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [dataServices, setDataServices] = useState<IDataService[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const [banks, services, allCountries] = await Promise.all([
        getAllBanks(),
        getAllServices(),
        getAllCountries(),
      ]);
      setBanks(banks);
      setServices(services);
      setCountries(allCountries);
    };

    fetchInitialData();
    fetchDataServices(); // Llama también a la función de servicios de datos
  }, []);

  // Mueve fetchDataServices fuera del useEffect para reutilizarla
  const fetchDataServices = async () => {
    const allDataServices = await getAllDataService();
    setDataServices(allDataServices);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newDataService = { ...dataService, [name]: value };

    if (name === "bank_id") {
      const selectedBank = banks.find((bank) => bank.bank_id === Number(value));
      console.log("banco seleccionado:", selectedBank);

      if (selectedBank) {
        newDataService.country_id = selectedBank.country_id || ""; // Asegura que country_id se actualice
      }
    }

    if (name === "service_id") {
      newDataService.service_id = value ? parseInt(value) : 0;
    }

    setDataService(newDataService);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: IDataService = {
      ...dataService,
      bank_id: dataService.bank_id,
      service_id: dataService.service_id,
    };

    try {
      console.log("datos enviados la back", payload);

      await createDataService(payload);
      Swal.fire({ icon: "success", title: "Servicio de datos creado" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el servicio de datos",
        text: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };

  const handleNewBankSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const createdBank = await createBank(newBank);
      setBanks((prevBanks) => [...prevBanks, createdBank]);
      Swal.fire({ icon: "success", title: "Banco creado" });
      setNewBank({ bank: "", country_id: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el banco",
        text: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };

  const handleNewServiceSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await createService({ service: newServiceName });
      setServices((prevServices) => [
        ...prevServices,
        { service: newServiceName, service_id: services.length + 1 },
      ]);
      Swal.fire({ icon: "success", title: "Servicio creado" });
      setNewServiceName("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el servicio",
        text: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };

  const handleDelete = async (data_service?: number) => {
    if (data_service !== undefined) {
      const confirm = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (confirm.isConfirmed) {
        try {
          await deleteDataService(data_service.toString()); // Asegúrate de que sea un string
          Swal.fire("Eliminado", "El servicio ha sido eliminado.", "success");
          fetchDataServices(); // Actualiza la lista después de eliminar el servicio
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al eliminar el servicio de datos",
            text: error instanceof Error ? error.message : "Error desconocido",
          });
        }
      }
    }
  };

  return (
    <div className="flex flex-col py-2">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Gestión de Mercado Financiero
      </h1>

      {/* Formulario de Crear Banco */}
      <div className="flex flex-row justify-around align-center">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-xl font-bold mt-6">Crear Banco</h2>
          <form
            onSubmit={handleNewBankSubmit}
            className="flex flex-col w-full max-w-md"
          >
            <label className="text-lg mb-2">Nombre del Banco:</label>
            <input
              type="text"
              value={newBank.bank}
              placeholder="BANCO DE RESERVAS DE LA REP. DOM."
              onChange={(e) => setNewBank({ ...newBank, bank: e.target.value })}
              className="border rounded px-2 py-1 w-full"
            />
            <label className="text-lg mb-2">País:</label>
            <select
              value={newBank.country_id}
              onChange={(e) =>
                setNewBank({ ...newBank, country_id: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Seleccione un país</option>
              {countries.map((country) => (
                <option key={country.country_id} value={country.country_id}>
                  {country.country}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-green-500 text-white rounded px-4 py-2 mt-4"
            >
              Crear Banco
            </button>
          </form>
        </div>

        {/* Formulario de Crear Servicio */}
        <div className="flex flex-col items-center w-full">
          <h2 className="text-xl font-bold mt-6">Crear Servicio</h2>
          <form
            onSubmit={handleNewServiceSubmit}
            className="flex flex-col w-full max-w-md"
          >
            <label className="text-lg mb-2">Nombre del Servicio:</label>
            <input
              type="text"
              value={newServiceName}
              placeholder="CUENTA DE AHORROS"
              onChange={(e) => setNewServiceName(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white rounded px-4 py-2 mt-4"
            >
              Crear Servicio
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-20">
        {/* Formulario de Crear Servicio de Datos */}
        <h2 className="text-xl font-bold mb-6">Crear Servicio de Datos</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
          <label className="text-lg mb-2">Nombre del Servicio de Datos:</label>
          <input
            type="text"
            name="name"
            value={dataService.name}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
          <label className="text-lg mb-2">Banco:</label>
          <select
            name="bank_id"
            value={dataService.bank_id}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="">Seleccione un banco</option>
            {banks.map((bank) => (
              <option key={bank.bank_id} value={bank.bank_id}>
                {bank.bank}
              </option>
            ))}
          </select>
          <label className="text-lg mb-2">Servicio:</label>
          <select
            name="service_id"
            value={dataService.service_id}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="">Seleccione un servicio</option>
            {services.map((service) => (
              <option key={service.service_id} value={service.service_id}>
                {service.service}
              </option>
            ))}
          </select>
          <label className="text-lg mb-2">Secuencia:</label>
          <input
            type="number"
            name="secuence"
            value={dataService.secuence}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
          <label className="text-lg mb-2">Monto Apertura:</label>
          <input
            type="number"
            name="opening_amount"
            value={dataService.opening_amount}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
          <label className="text-lg mb-2">Tasa de Interés:</label>
          <input
            type="number"
            name="interest_rate"
            value={dataService.interest_rate}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
          <label className="text-lg mb-2">Requisitos:</label>
          <input
            type="text"
            name="requeriment"
            value={dataService.requeriment}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
          <label className="text-lg mb-2">Beneficios:</label>
          <input
            type="text"
            name="benefit_offered"
            value={dataService.benefit_offered}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
          <label className="text-lg mb-2">Nombre Comercial:</label>
          <input
            type="text"
            name="trade_name"
            value={dataService.trade_name}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
          >
            Crear Servicio de Datos
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center w-full mt-20">
        <h2 className="text-xl font-bold mb-6">Servicios de Datos</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID Servicio</th>
              <th className="border border-gray-300 px-4 py-2">Banco</th>
              <th className="border border-gray-300 px-4 py-2">Servicio</th>
              <th className="border border-gray-300 px-4 py-2">Secuencia</th>
              <th className="border border-gray-300 px-4 py-2">
                Monto Apertura
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Tasa de Interés
              </th>
              <th className="border border-gray-300 px-4 py-2">Requisitos</th>
              <th className="border border-gray-300 px-4 py-2">
                Beneficios Ofrecidos
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Nombre Comercial
              </th>
              <th className="border border-gray-300 px-4 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {dataServices.map((dataService) => {
              const bank = banks.find((b) => b.bank_id === dataService.bank_id);
              const service = services.find(
                (s) => s.service_id === dataService.service_id
              );

              return (
                <tr key={dataService.data_service}>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataService.data_service}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {bank ? bank.bank : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {service ? service.service : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataService.secuence}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataService.opening_amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataService.interest_rate} %
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataService.requeriment}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataService.benefit_offered}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataService.trade_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(dataService.data_service)}
                      className="bg-red-500 text-white rounded px-4 py-2"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
