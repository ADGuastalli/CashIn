"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import {
  Button_Menu,
  Button_forms,
  Button_actions_rounded,
} from "../ui/Buttons";
import Link from "next/link";
import { Input } from "../ui/Input";
import { UserContext } from "../../context/userContext";
import { useState, useContext } from "react";
import Swal from "sweetalert2";

export default function DiagnosticoComponet() {
  const { user } = useContext(UserContext);
  const [sueldo, setSueldo] = useState("");
  const [monto, setMonto] = useState("");
  const [sueldos, setSueldos] = useState<
    { tipoSueldo: string; monto: string }[]
  >([]);

  const handleSubmitIngresos = (e: React.FormEvent) => {
    e.preventDefault();
    if (sueldo && monto) {
      setSueldos([...sueldos, { tipoSueldo: sueldo, monto }]);
      setSueldo("");
      setMonto("");
    }
  };

  const handleDeleteIngresos = (index: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres eliminar ese ingreso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setSueldos(sueldos.filter((_, i) => i !== index));
        Swal.fire("¡Eliminado!", "El ingreso ha sido eliminado.", "success");
      }
    });
  };

  const totalIngresos = sueldos.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
  );

  //Deudas
  const [deuda, setDeuda] = useState("");
  const [montoDeuda, setMontoDeuda] = useState("");
  const [deudas, setDeudas] = useState<{ tipoDeuda: string; monto: string }[]>(
    []
  );

  const handleSubmitDeudas = (e: React.FormEvent) => {
    e.preventDefault();
    if (deuda && montoDeuda) {
      setDeudas([...deudas, { tipoDeuda: deuda, monto: montoDeuda }]);
      setDeuda("");
      setMontoDeuda("");
    }
  };

  const handleDeleteDeudas = (index: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres eliminar la deuda",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeudas(deudas.filter((_, i) => i !== index));
        Swal.fire("¡Eliminado!", "La deuda ha sido eliminado.", "success");
      }
    });
  };

  const totalDeuda = deudas.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
  );

  //Bienes
  const [bien, setBien] = useState("");
  const [montoBien, setMontoBien] = useState("");
  const [bienes, setBienes] = useState<{ tipoBien: string; monto: string }[]>(
    []
  );

  const handleSubmitBienes = (e: React.FormEvent) => {
    e.preventDefault();
    if (bien && montoBien) {
      setBienes([...bienes, { tipoBien: bien, monto: montoBien }]);
      setBien("");
      setMontoBien("");
    }
  };

  const handleDeleteBienes = (index: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres eliminar el bien",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setBienes(bienes.filter((_, i) => i !== index));
        Swal.fire("¡Eliminado!", "El bien ha sido eliminado.", "success");
      }
    });
  };

  const totalBienes = bienes.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
  );

  return (
    <div>
      <div>
        <Link href="/Menu">
          <Button_Menu />
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image src={Logo} alt="Logo" width={300} height={300} />

        <div className="text-center mt-5">
          <h1 className="text-2xl mt-6 font-black">
            Conozcamos un poco de tus
          </h1>
          <h2 className="text-xl mt-1">Finanzas personales.</h2>
        </div>
        <div className="flex flex-wrap justify-between items-start mt-10 w-full max-w-7xl space-x-5">
          <div className="flex-1">
            <form
              onSubmit={handleSubmitIngresos}
              className="flex flex-col justify-center items-center mt-5"
            >
              <div className="flex flex-col mt-5">
                <label className="text-lg font-bold">Tipo de Ingreso</label>
                <select
                  className="bg-white focus:outline-none focus:ring focus:ring-secondary border border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96"
                  value={sueldo}
                  onChange={(e) => setSueldo(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="INGRESO 1">INGRESO 1</option>
                  <option value="INGRESO 2">INGRESOSO POR INTERESES</option>
                  <option value="BONIFICACION POR LEY">
                    BONIFICACION POR LEY
                  </option>
                  <option value="INCENTIVOS Y HORAS EXTRAS">
                    INCENTIVOS Y HORAS EXTRAS
                  </option>
                  <option value="VACACIONES">VACACIONES</option>
                  <option value="REEMBOLSOSS">REEMBOLSOS</option>
                  <option value="NEGOCIOS">NEGOCIOS</option>
                  <option value="DIVISION DE ACCIONES">
                    DIVISION DE ACCIONES
                  </option>
                  <option value="PENSION">PENSION</option>
                </select>
              </div>

              <div className="flex flex-col">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-black">
                    $
                  </span>
                  <Input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-10">
                <Button_forms type="submit">GUARDAR</Button_forms>
              </div>
            </form>

            <div className="mt-10">
              <h3 className="text-lg font-black text-center">
                Total Ingresos: ${totalIngresos.toFixed(2)}
              </h3>
            </div>

            {sueldos.length > 0 && (
              <ul className="mt-5">
                {sueldos.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                  >
                    <div>
                      <p className="font-bold text-gray-400">
                        {item.tipoSueldo}
                      </p>
                      <p className="font-bold">Monto: ${item.monto}</p>
                    </div>
                    <button
                      className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8"
                      onClick={() => handleDeleteIngresos(index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-1">
            <form
              onSubmit={handleSubmitDeudas}
              className="flex flex-col justify-center items-center mt-5"
            >
              <div className="flex flex-col mt-5">
                <label className="text-lg font-bold">Tipo de Deuda</label>
                <select
                  className="bg-white focus:outline-none focus:ring focus:ring-secondary border border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96"
                  value={deuda}
                  onChange={(e) => setDeuda(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="HIPOTECARIOS">HIPOTECARIOS</option>
                  <option value="PERSONALES">PERSONALES</option>
                  <option value="VEHICULOS">VEHICULOS</option>
                  <option value="TARJETAS DE CREDITO">
                    TARJETAS DE CREDITO
                  </option>
                  <option value="PRESTAMOS INFORMALES">
                    PRESTAMOS INFORMALES
                  </option>
                  <option value="COMPRA DE ARTICULOS A CREDITO">
                    COMPRA DE ARTICULOS A CREDITO
                  </option>
                  <option value="PRESTAMOS ESCOLARES">
                    PRESTAMOS ESCOLARES
                  </option>
                  <option value="PRESTAMOS A TERCEROS">
                    PRESTAMOS A TERCEROS
                  </option>
                  <option value="PRESTAMOS FAMILIARES">
                    PRESTAMOS FAMILIARES
                  </option>
                  <option value="OTRAS DEUDAS">OTRAS DEUDAS</option>
                </select>
              </div>

              <div className="flex flex-col">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-black">
                    $
                  </span>
                  <Input
                    type="number"
                    value={montoDeuda}
                    onChange={(e) => setMontoDeuda(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-10">
                <Button_forms type="submit">GUARDAR</Button_forms>
              </div>
            </form>

            <div className="mt-10">
              <h3 className="text-lg font-black text-center">
                Total Deudas: ${totalDeuda.toFixed(2)}
              </h3>
            </div>

            {deudas.length > 0 && (
              <ul className="mt-5">
                {deudas.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                  >
                    <div>
                      <p className="font-bold text-gray-400">
                        {item.tipoDeuda}
                      </p>
                      <p className="font-bold">Monto: ${item.monto}</p>
                    </div>
                    <button
                      className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8"
                      onClick={() => handleDeleteDeudas(index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-1">
            <form
              onSubmit={handleSubmitBienes}
              className="flex flex-col justify-center items-center mt-5"
            >
              <div className="flex flex-col mt-5">
                <label className="text-lg font-bold">Bienes</label>
                <Input
                  type="text"
                  value={bien} // Aquí debes usar 'bien', no 'bienes'
                  onChange={(e) => setBien(e.target.value)} // Actualiza el valor de 'bien'
                />
              </div>

              <div className="flex flex-col">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-black">
                    $
                  </span>
                  <Input
                    type="number"
                    value={montoBien} // Este es el monto del bien
                    onChange={(e) => setMontoBien(e.target.value)} // Actualiza el valor del monto del bien
                  />
                </div>
              </div>

              <div className="flex flex-col mt-10">
                <Button_forms type="submit">GUARDAR</Button_forms>
              </div>
            </form>

            <div className="mt-10">
              <h3 className="text-lg font-black text-center">
                Total en Bienes: ${totalBienes.toFixed(2)}
              </h3>
            </div>

            {bienes.length > 0 && (
              <ul className="mt-5">
                {bienes.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                  >
                    <div>
                      <p className="font-bold text-gray-400">{item.tipoBien}</p>
                      <p className="font-bold">Monto: ${item.monto}</p>
                    </div>
                    <button
                      className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8"
                      onClick={() => handleDeleteBienes(index)} // Asegúrate de eliminar el bien correcto
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {sueldos.length > 0 && bienes.length > 0 && deudas.length > 0 && (
          <div className="flex flex-col items-center">
            <Link href="/Loading">
              <Button_actions_rounded>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-[#C38A01]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button_actions_rounded>
            </Link>
            <p className="font-black text-xl text-[#FAB100]">Analizar</p>
          </div>
        )}
      </div>
    </div>
  );
}
