"use client";
import React, { useContext } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { Button_Menu, Button_Home } from "../ui/Buttons";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import Image from "next/image";
import PlanesComponet from "./planes";

export default function MembershipComponet() {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <div>
      <div className="mt-3 ml-3">
        {isAuthenticated ? (
          <Link href="/Menu">
            <Button_Menu />
          </Link>
        ) : (
          <Link href="/">
            <Button_Home />
          </Link>
        )}
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen mb-20">
        <Image src={Logo} alt="Logo" width={300} height={300} />
        <div className="text-center my-5">
          <h1 className="text-2xl mt-6 font-black">
            ¡HOLA! ¿Quieres conocer todo nuestro potencial?
          </h1>
          <h2 className="text-xl mt-1">
            Selecciona la mejor membresía para ti.
          </h2>
        </div>
        <div className="mt-10">
          <PlanesComponet />
        </div>
      </div>
    </div>
  );
}
