import React from "react";
import Link from "next/link";
import ButtonBack from "../../../components/ui/Button/index";
import Logo from "../../../public/assets/image-removebg-preview.png";
import Imagen1 from "../../../public/assets/imagen 1.png";
import Image from "next/image";
import LoginComponet from "../../../components/Login";
export default function Login() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex mt-3 ml-3">
        <Link href="/">
          <ButtonBack />
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center mx-auto">
        <Image src={Logo} alt="Logo" width={200} height={200} />
        <Image src={Imagen1} alt="Imagen1" width={300} height={300} />
        <h1 className="text-5xl text-center mb-10">
          <span className="font-bold">¡Hola!</span> Bienvenido(a){" "}
          <span className="font-bold">¿Quieres Ingresar?</span>
        </h1>
        <div className="flex gap-10 mt-3">
          <LoginComponet />
        </div>
      </div>
    </div>
  );
}
