"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Button_Menu,
  Button_forms,
  Button_actions_rounded,
} from "../ui/Buttons";
import { Input } from "../ui/Input";
import { useGastos } from "../../context/gastosContext";
import Logo from "../../public/assets/svg/CASHIN-03.svg";

export default function GastoIndividualComponet() {
  const { state, dispatch } = useGastos();
  const [monto, setMonto] = useState<string>("");
  const [subtipoSeleccionado, setSubtipoSeleccionado] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tipoGasto = state.selectedTipoGasto || "";

    if (tipoGasto && monto && subtipoSeleccionado) {
      dispatch({
        type: "ADD_GASTO",
        payload: { tipoGasto, monto, subtipoGasto: subtipoSeleccionado },
      });
      setMonto("");
      setSubtipoSeleccionado("");
    }
  };

  const handleDelete = (index: number) => {
    dispatch({ type: "DELETE_GASTO", payload: index });
  };

  const totalGasto = state.gastos.reduce(
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
            Por favor ingresa el gasto
          </h1>
          <h2 className="text-xl mt-1">Especifica el importe.</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex flex-col mt-5">
              <label className="text-lg font-bold">Tipo de Gasto</label>
              <Input value={state.selectedTipoGasto || ""} readOnly />
            </div>

            {state.subtipos && state.subtipos.length > 0 && (
              <div className="mt-4">
                <label className="text-lg font-bold">Subtipo de Gasto</label>
                <select
                  className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
             border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96 appearance-none leading-normal
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
                  value={subtipoSeleccionado}
                  onChange={(e) => setSubtipoSeleccionado(e.target.value)}
                >
                  <option value="">Selecciona sub Categoria</option>
                  {state.subtipos.map((subtipo, index) => (
                    <option key={index} value={subtipo}>
                      {subtipo}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
            Total Deudas: ${totalGasto.toFixed(2)}
          </h3>
        </div>

        {state.gastos.length > 0 && (
          <div className="grid grid-cols-3 grid-rows-1 gap-40">
            <div className="flex flex-col items-center">
              <Link href="/Menu/Gastos">
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
                {state.gastos.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                  >
                    <div className="flex flex-col">
                      <p className="font-bold text-gray-400">
                        {item.tipoGasto}
                      </p>
                      <p className="font-bold text-sm text-gray-400">
                        {item.subtipoGasto}
                      </p>
                      <p className="font-bold mt-1">Monto: ${item.monto}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8 flex justify-center items-center"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>

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
          </div>
        )}
      </div>
    </div>
  );
}
