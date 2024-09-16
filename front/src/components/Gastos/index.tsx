"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button_Menu } from "../ui/Buttons";
import { useGastos } from "../../context/gastosContext";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import ImgHogar from "../../public/assets/svg/gastos/home.svg";
import imgAlim from "../../public/assets/svg/gastos/cutlery.svg";
import imgTrans from "../../public/assets/svg/gastos/car.svg";
import ImaAhorro from "../../public/assets/svg/gastos/piggy-bank.svg";
import ImgEdu from "../../public/assets/svg/gastos/books-stack-of-three.svg";
import ImgDona from "../../public/assets/svg/gastos/business-and-finance.svg";
import ImgSalud from "../../public/assets/svg/high-five.svg";
import ImgPres from "../../public/assets/svg/gastos/loan.svg";

// Define las categorías y sus subtipos
const categorias = [
  {
    tipo: "Servicios y Hogar",
    img: ImgHogar,
    subtipos: [
      "Alquiler",
      "Electricidad",
      "Agua",
      "Gas",
      "Telefono",
      "Celular",
      "Cable",
      "Internet",
      "Reparaciones",
      "Mantenimiento",
      "Servicios Domesticos",
      "Planta Electrica/Gasoil",
      "Jardineria",
      "Otros",
    ],
  },
  {
    tipo: "Alimentos y Cuidado Personal",
    img: imgAlim,
    subtipos: ["Alimentos", "Cuidado Personal", "Otros"],
  },
  {
    tipo: "Transporte",
    img: imgTrans,
    subtipos: [
      "Gasolina",
      "Seguro de Vehiculo",
      "Mantenimiento",
      "Limpieza",
      "Impuestos/Placa",
      "Reparaciones o Deducibles",
      "Transporte Escolar",
      "Otros",
    ],
  },
  {
    tipo: "Seguros e Impuestos",
    img: ImgDona,
    subtipos: [
      "Seguros de Salud",
      "AFP (Pensiones)",
      "Seguro de Vivienda",
      "Seguro de Vida",
      "Impuestos Personales",
      "Impuestos de Viviendas",
      "Otros",
    ],
  },
  {
    tipo: "Educacion y Recreacion",
    img: ImgEdu,
    subtipos: [
      "Colegios",
      "Uniformes, Libros, Materiales",
      "Sala de Tarea",
      "Clases de Idiomas",
      "Deportes",
      "Otros",
    ],
  },
  {
    tipo: "Diezmo y Ahorros",
    img: ImaAhorro,
    subtipos: [
      "Diezmo",
      "Ahorros",
      "Fondos de Contingencia",
      "Plan de Retiro",
      "Donativos",
      "Otros",
    ],
  },
  {
    tipo: "Miscelaneos",
    img: ImgSalud,
    subtipos: ["Vacaciones", "Recreacion", "Vestidos, Calzados", "Otros"],
  },
  {
    tipo: "Gastos Varios",
    img: ImgPres,
    subtipos: [
      "Cosmeticos, Perfumes, Accesorios",
      "Salon de Belleza/Barbero",
      "Lavanderia",
      "Comidas Fuera de Casa",
      "Revistas/Periodicos",
      "Regalos",
      "Propinas/Donaciones",
      "Mascotas (Alimentos, Veterinarios, Otros)",
      "Clubes y Gymnasios",
      "Otros",
    ],
  },
];

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
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image src={Logo} alt="Logo" width={300} height={300} />
        <div className="text-center mt-10">
          <h1 className="text-2xl mt-6 font-black">
            Tipos de gastos a registrar
          </h1>
          <h2 className="text-xl mt-1">Escoge uno.</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-8 text-center w-full max-w-4xl mt-10">
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
