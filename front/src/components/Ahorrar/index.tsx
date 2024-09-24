import React from "react";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import { Button_Menu } from "../ui/Buttons";
import Link from "next/link";
import Image from "next/image";
import ImgEmer from "../../public/assets/svg/ambulance.svg";
import ImgMeta from "../../public/assets/svg/suitcase.svg";
import ImgRetiro from "../../public/assets/svg/old-couple.svg";
import ImgVaca from "../../public/assets/svg/air-freight.svg";

export default function Ahorrarcomponet() {
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
            ¡Felicitaciones por tomar la decisión de Ahorrar!
          </h1>
          <h2 className="text-xl mt-1">
            Te recomendamos que tengas una meta, sin ella no podrás{" "}
            <span className="font-black">ahorrar</span>.
          </h2>
          <h3 className="text-lg mt-10 text-gray-400">
            Seleccionar una opción
          </h3>
        </div>
        <div className="flex flex-col items-center mt-5">
          <Link href="/Menu/Ahorrar/Finanzas">
            <div className="flex flex-grow items-center justify-start p-4 hover:bg-[#0095A9]/15 rounded-xl shadow-md w-96 h-36 transition-all duration-500 mb-5">
              <div className="flex flex-col items-center justify-center p-4 rounded-full shadow-md w-24 h-24 bg-[#0095a91b] transition-all duration-500">
                <Image
                  src={ImgEmer}
                  alt="Controlar Mis gastos"
                  width={60}
                  height={60}
                />
              </div>
              <p className="mt-2 ml-10 text-lg font-bold">Para Emergencias</p>
            </div>
          </Link>
          <Link href="/Menu/Ahorrar/Finanzas">
            <div className="flex flex-grow items-center justify-start p-4 hover:bg-[#0095A9]/15 rounded-xl shadow-md w-96 h-36 transition-all duration-500 mb-5">
              <div className="flex flex-col items-center justify-center p-4 rounded-full shadow-md w-24 h-24 bg-[#0095a91b] transition-all duration-500">
                <Image
                  src={ImgMeta}
                  alt="Poder pagar mis deudas"
                  width={60}
                  height={60}
                />
              </div>
              <p className="mt-2 ml-10 text-lg font-bold">Logre de Metas</p>
            </div>
          </Link>
          <Link href="/Menu/Ahorrar/Finanzas">
            <div className="flex flex-grow items-center justify-start p-4 hover:bg-[#0095A9]/15 rounded-xl shadow-md w-96 h-36 transition-all duration-500 mb-5">
              <div className="flex flex-col items-center justify-center p-4 rounded-full shadow-md w-24 h-24 bg-[#0095a91b] transition-all duration-500">
                <Image
                  src={ImgRetiro}
                  alt="Controlar Mis gastos"
                  width={60}
                  height={60}
                />
              </div>
              <p className="mt-2 ml-10 text-lg font-bold">Retiro</p>
            </div>
          </Link>
          <Link href="/Menu/Ahorrar/Finanzas">
            <div className="flex flex-grow items-center justify-start p-4 hover:bg-[#0095A9]/15 rounded-xl shadow-md w-96 h-36 transition-all duration-500">
              <div className="flex flex-col items-center justify-center p-4 rounded-full shadow-md w-24 h-24 bg-[#0095a91b] transition-all duration-500">
                <Image
                  src={ImgVaca}
                  alt="Controlar Mis gastos"
                  width={60}
                  height={60}
                />
              </div>
              <p className="mt-2 ml-10 text-lg font-bold">Vacaciones</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
