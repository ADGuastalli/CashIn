"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import MenuIcons from "@/components/Menu";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { hasNullProperties } from "@/helpers/hasNullProperties";
import { useRouter } from "next/navigation";
import ModalFormComplete from "@/components/ModalFormComplet";
import { Button_Menu } from "@/components/ui/Buttons";
import Link from "next/link";
export default function Menu() {
  // si no esta completo el formulario lo redirijo
  const { userProfile } = useContext(UserContext);
  const router = useRouter();
  console.log("id", userProfile)
  return (
    <div>
      <div>
        <Link href={"/"}>
          <Button_Menu />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        {hasNullProperties(userProfile) && (
          <ModalFormComplete router={router} id={userProfile.id} />
        )}
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
          className="mt-2"
        />

        <h1 className="text-3xl mt-6 mb-4">
          ¿Qué deseas hacer con nuestra app{" "}
          <span className="font-bold">
            {userProfile.last_name || userProfile.email}
          </span>
          ?
        </h1>
        <MenuIcons />
      </div>
    </div>
  );
}
