import React from "react";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import Image from "next/image";
import Link from "next/link";
import { Button_Home } from "@/components/ui/Buttons";
import ContactMail from "@/components/SolicitudFinanciera";

export default function Contacto() {
  return (
    <div className="mb-20">
      <div>
        <Link href={"/"}>
          <Button_Home />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
          className="mt-2"
        />
        <h1 className="text-3xl font-bold text-center mt-4">
          Contactate con nosotros
        </h1>

        <div className="flex flex-col items-center justify-center mt-20">
          <ContactMail />
        </div>
      </div>
    </div>
  );
}
