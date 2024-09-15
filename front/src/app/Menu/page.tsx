import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import MenuIcons from "@/components/Menu";

export default function Menu() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image src={Logo} alt="Logo" width={250} height={250} className="mt-2" />

      <h1 className="text-3xl mt-6 mb-4">
        ¿Qué deseas hacer con nuestra app{" "}
        <span className="font-bold">Luz Jimenez</span>?
      </h1>
      <MenuIcons />
    </div>
  );
}
