import React from "react";
import Link from "next/link";
import ButtonBack from "../../../components/ui/Button/index";
import RegisterComponet from "../../../components/Register/index";
import Logo from "../../../public/assets/svg/CASHIN-03.svg";
import Imagen1 from "../../../public/assets/imagen2.png";
import Image from "next/image";

export default function Register() {
  return (
    <div>
      <div className="flex mt-3 ml-3">
        <Link href="/User/Login">
          <ButtonBack />
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center mx-auto">
        <Image
          src={Logo}
          alt="Logo"
          width={200}
          height={200}
          className="mt-2"
        />
        <Image
          src={Imagen1}
          alt="Imagen1"
          width={300}
          height={300}
          className="my-5"
        />
        <h1 className="text-5xl text-center mb-10">
          <span className="font-bold">¡Hola!</span> Bienvenido(a){" "}
          <span className="font-bold">¿Quieres Registrarte?</span>
        </h1>
        <div className="flex gap-10 mt-3">
          <RegisterComponet />
        </div>
      </div>
    </div>
  );
}
