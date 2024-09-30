import React from "react";
import Link from "next/link";
import Image from "next/image";
import ImgBolsa from "../../public/assets/svg/tax.svg";
import ImgTrans from "../../public/assets/svg/transfer.svg";
import ImgCard from "../../public/assets/svg/surface1.svg";
import ImgAhorro from "../../public/assets/svg/piggy-bank.svg";
import ImgDiag from "../../public/assets/svg/review.svg";
import ImgPresu from "../../public/assets/svg/budget.svg";
import ImgUser from "../../public/assets/svg/user-circle-svgrepo-com.svg";
import ImgChat from "../../public/assets/svg/chatIA.png";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

export default function MenuIcons() {
  const { userProfile } = useContext(UserContext);
  console.log("userProfileeeeee", userProfile);

  const userId = userProfile?.id;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center w-full max-w-4xl mt-10">
      <Link href="/Menu/PagarMisDeudas">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image
              src={ImgBolsa}
              alt="Poder pagar mis deudas"
              width={60}
              height={60}
            />
          </div>
          <p className="mt-2 text-lg font-bold">Poder pagar mis deudas</p>
        </div>
      </Link>

      <Link href="/Menu/Gastos">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image
              src={ImgTrans}
              alt="Controlar Mis gastos"
              width={60}
              height={60}
            />
          </div>
          <p className="mt-2 text-lg font-bold">Controlar Mis gastos</p>
        </div>
      </Link>

      <Link href="/Menu/Metas">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image src={ImgCard} alt="Lograr metas" width={60} height={60} />
          </div>
          <p className="mt-2 text-lg font-bold">
            Lograr metas <br />
            <span className="font-medium">(Carro, Casa, Estufa)</span>
          </p>
        </div>
      </Link>

      <Link href="/Menu/Ahorrar">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image src={ImgAhorro} alt="Ahorrar" width={60} height={60} />
          </div>
          <p className="mt-2 text-lg font-bold">Ahorrar</p>
        </div>
      </Link>

      <Link href="/Menu/Diagnostico">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md  w-40 h-40 transition-all duration-500">
            <Image src={ImgDiag} alt="Diagnostico" width={60} height={60} />
          </div>
          <p className="mt-2 text-lg font-bold">
            Diagnostico <br />
            <span className="font-medium">(Diagnostico de mis finanzas)</span>
          </p>
        </div>
      </Link>

      <Link href="#">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image src={ImgPresu} alt="Presupuesto" width={60} height={60} />
          </div>
          <p className="mt-2 text-lg font-bold">Presupuesto</p>
        </div>
      </Link>

      <Link href="https://chatgpt.com/g/g-R6OiPvkkm-cashinbot">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image src={ImgChat} alt="Chat" width={90} height={90} />
          </div>
          <p className="mt-2 text-lg font-bold">CashInBOT</p>
        </div>
      </Link>

      <Link href={`/User/${userId}/presupuesto`}>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image src={ImgUser} alt="Mi perfil" width={60} height={60} />
          </div>
          <p className="mt-2 text-lg font-bold">Mi perfil</p>
        </div>
      </Link>
    </div>
  );
}
