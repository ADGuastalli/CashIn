"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button_Menu } from "../ui/Buttons";
import { useGastos } from "../../context/gastosContext";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import { categorias } from "@/helpers/categorias";

// Componente principal
export default function GastosComponet() {
  const { dispatch } = useGastos();

  // Función para manejar la selección del tipo de gasto y sus subtipos
  const handleSelect = (tipo: string, subtipos: string[]) => {
    dispatch({
      type: "SELECT_TIPO_GASTO",
      payload: { tipoGasto: tipo, subtipos },
    });
  };

  return (
    <div>
      <div>
        <Link href="/Menu">
          <Button_Menu />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen px-5">
        <Image
          src={Logo}
          alt="Logo"
          width={300}
          height={300}
          className="my-5 w-[50%] sm:w-[300px]"
        />
        <div className="text-center mt-10">
          <h1 className="lg:text-3xl md:text-2xl text-2xl mt-6 font-black">
            Tipos de gastos a registrar
          </h1>
          <h2 className="text-xl mt-1">Escoge uno.</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center w-full max-w-4xl mt-10">
          {categorias.map(({ tipo, img, subtipos }, index) => (
            <Link href="/Menu/Gastos/GastoIndividual" key={index}>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleSelect(tipo, subtipos)}
              >
                <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-full shadow-md w-32 h-32 transition-all duration-500">
                  <Image src={img} alt={tipo} width={40} height={40} />
                </div>
                <p className="mt-2 text-lg font-bold">{tipo}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
