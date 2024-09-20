"use client";
import React from "react";
import Image from "next/image";
import { useGastos } from "../../context/gastosContext";
import { categorias } from "@/helpers/categorias";

// Componente principal
export default function ModalSelectGastos() {
  const { dispatch } = useGastos();

  // Función para manejar la selección del tipo de gasto y sus subtipos
  const handleSelect = (tipo: string, subtipos: string[]) => {
    dispatch({
      type: "SELECT_TIPO_GASTO",
      payload: { tipoGasto: tipo, subtipos },
    });
  };

  return (
    <div className="fixed md:pl-64 z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
     

      <div className="bg-white p-6 m-8 rounded-lg shadow-lg w-full max-w-4xl h-auto">
        <div className="flex flex-col justify-center items-center">
        
          <div className="text-center mt-4">
            <h1 className="text-2xl font-black">Tipos de gastos a registrar</h1>
            <h2 className="text-lg mt-2">Escoge uno.</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 mt-6 w-full">
            {categorias.map(({ tipo, img, subtipos }, index) => (
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleSelect(tipo, subtipos)}
                    key={index}>
                  <div className="flex flex-col items-center justify-center p-6 hover:bg-[#0095A9]/15 rounded-full shadow-md transition-all duration-500">
                    <Image src={img} alt={tipo} width={20} height={20} />
                  </div>
                  <p className="mt-2 text-xs sm:text-base  font-bold">
                    {tipo}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}