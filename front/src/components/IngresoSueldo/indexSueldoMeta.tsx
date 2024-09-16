"use client";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import {
  Button_Menu,
  Button_forms,
  Button_actions_rounded,
} from "../ui/Buttons";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/Input";

export default function IngresoFinanzasMetaComponet() {
  const { user } = useContext(UserContext);
  const [sueldo, setSueldo] = useState("");
  const [monto, setMonto] = useState("");
  const [sueldos, setSueldos] = useState<
    { tipoSueldo: string; monto: string }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sueldo && monto) {
      setSueldos([...sueldos, { tipoSueldo: sueldo, monto }]);
      setSueldo("");
      setMonto("");
    }
  };

  const handleDelete = (index: number) => {
    setSueldos(sueldos.filter((_, i) => i !== index));
  };

  // Calcular el total de las deudas
  const totalDeuda = sueldos.reduce(
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
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex flex-col mt-5">
                <label className="text-lg font-bold">Tipo de Ingreso</label>
                <select
                  className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
             border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96 appearance-none leading-normal
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
                  value={sueldo}
                  onChange={(e) => setSueldo(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="INGRESO 1">INGRESO 1</option>
                  <option value="INGRESO 2">INGRESO 2</option>
                  <option value="INGRESOSO POR INTERESES">
                    INGRESOSO POR INTERESES
                  </option>
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
                  <span className="absolute inset-y-0 left-3 pl-3 flex items-center font-black">
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

          {sueldos.length > 0 && (
            <div className="grid grid-cols-3 grid-rows-1 gap-40">
              <div className="flex flex-col items-center">
                <Link href="/Menu/Ahorrar">
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
                <p className="font-black text-xl text-[#FAB100]">Atras</p>
              </div>

              <div>
                <ul>
                  {sueldos.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                    >
                      <div className="flex flex-col mr-20">
                        <p className="font-bold text-gray-400">
                          {item.tipoSueldo}
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
              </div>
              <div className="flex flex-col items-center">
                <Link href="/Menu/Ahorrar/Finanzas/MontoMeta">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
