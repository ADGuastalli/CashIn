'use client'
import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import MenuIcons from "@/components/Menu";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { hasNullProperties } from "@/helpers/hasNullProperties";
import { useRouter } from "next/navigation";
import ModalFormComplete from "@/components/ModalFormComplet";
export default function Menu() {

  // si no esta completo el formulario lo redirijo 
  const { userProfile } = useContext(UserContext)
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {// hacer un modal de completar formulario
        hasNullProperties(userProfile) && (<ModalFormComplete router={router} userId={userProfile.userId}/>)
      }
      <Image src={Logo} alt="Logo" width={250} height={250} className="mt-2" />
      
      <h1 className="text-3xl mt-6 mb-4">
        ¿Qué deseas hacer con nuestra app{" "}
        <span className="font-bold">Luz Jimenez</span>?
      </h1>
      <MenuIcons />
    </div>
  );
}
