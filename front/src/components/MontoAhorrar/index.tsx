import React from "react";
import Link from "next/link";
import { Button_forms, Button_Menu } from "../ui/Buttons";
import Image from "next/image";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import { Input } from "../ui/Input";

export default function MontoAhorarcomponet() {
  return (
    <div>
      <div>
        <Link href="/Menu">
          <Button_Menu />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image src={Logo} alt="Logo" width={300} height={300} />
        <div className="text-center mt-5">
          <h1 className="text-2xl mt-6 font-black">C¿Cuanto deseas Ahorrar?</h1>
          <h2 className="text-xl mt-1">Especificar monto.</h2>
        </div>
        <div>
          <form>
            <div className="mt-5">
              <div className="flex flex-col mt-12">
                <label className="text-lg font-bold">Porciento de ahorro</label>
                <div className="flex flex-col">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-black">
                      %
                    </span>
                    <input
                      type="number"
                      className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
                 border-gray-300 rounded-lg py-4 pl-5 px-4 mx-2 my-2 block w-24 appearance-none leading-normal
                 invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-lg "
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-10">
                <label className="text-lg font-bold">Valor en $</label>
                <div className="flex flex-col">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 pl-3 flex items-center font-black">
                      $
                    </span>
                    <Input type="number" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-10">
                <label className="text-lg font-bold">
                  ¿En que cuantos meses deseas lograrlo?
                </label>
                <div className="flex flex-col">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 pl-3 flex items-center font-black">
                      $
                    </span>
                    <Input type="number" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-10">
                <Link href="/Loading">
                  <Button_forms type="submit">GUARDAR</Button_forms>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
