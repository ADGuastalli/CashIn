"use client";
import React, { useState } from "react";

import Logo from "../../public/assets/svg/CASHIN-03.svg";
import {
  Button_Menu,
  Button_forms,
  Button_actions_rounded,
} from "../ui/Buttons";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/Input";
import Swal from "sweetalert2";

export default function PagarMisDeudasComponet() {
  const [deuda, setDeuda] = useState("");
  const [monto, setMonto] = useState("");
  const [deudas, setDeudas] = useState<{ tipoDeuda: string; monto: string }[]>(
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deuda && monto) {
      setDeudas([...deudas, { tipoDeuda: deuda, monto }]);
      setDeuda("");
      setMonto("");
    }
  };

  const handleDelete = (index: number) => {
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

  // Calcular el total de las deudas
  const totalDeuda = deudas.reduce(
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
      <div className="flex flex-col justify-center items-center  mx-auto p-5">
        <Image
          src={Logo}
          alt="Logo"
          width={300}
          height={300}
          className="my-5 w-[50%] sm:w-[300px]"
        />
        <div className="text-center mt-5">
          <h1 className="lg:text-3xl md:text-2xl text-2xl mt-6 font-black">
            Hablemos de tus deudas
          </h1>
          <h2 className="text-xl mt-1">
            Bríndanos por favor los datos sobre ellas y los montos
          </h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex flex-col mt-5">
                <label className="text-lg font-bold">Tipo de Deuda</label>
                <select
                  className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
             border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96 appearance-none leading-normal
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
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
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-10">
                <Button_forms type="submit">GUARDAR</Button_forms>
              </div>
            </div>
          </form>
          <div className="mt-10">
            <h3 className="text-lg font-black text-center">
              Total Deudas: ${totalDeuda.toFixed(2)}
            </h3>
          </div>

          {deudas.length > 0 && (
            <div className="flex flex-col items-center mt-10">
              {/* Lista de deudas */}
              <ul className="flex flex-col items-center w-full mb-5">
                {deudas.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                  >
                    <div className="flex flex-col mr-20">
                      <p className="font-bold text-gray-400">
                        {item.tipoDeuda}
                      </p>
                      <p className="font-bold">Monto: ${item.monto}</p>
                    </div>
                    <button
                      className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8 flex justify-center items-center"
                      onClick={() => handleDelete(index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>

              {/* Botones "Atrás" y "Continuar" alineados horizontalmente */}
              <div className="flex justify-between w-full max-w-lg mt-5">
                {/* Botón Atrás */}
                <div className="flex flex-col items-center">
                  <Link href="/Menu">
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </Button_actions_rounded>
                  </Link>
                  <p className="font-black text-xl text-[#FAB100]">Atrás</p>
                </div>

                {/* Botón Continuar */}
                <div className="flex flex-col items-center">
                  <Link href="/Menu/PagarMisDeudas/Finanzas">
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
                  <p className="font-black text-xl text-[#FAB100]">Continuar</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
