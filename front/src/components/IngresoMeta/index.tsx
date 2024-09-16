"use client";
import React from "react";
import Link from "next/link";
import {
  Button_actions_rounded,
  Button_forms,
  Button_Menu,
} from "../ui/Buttons";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import { Input } from "../ui/Input";
import Image from "next/image";
import { UserContext } from "../../context/userContext";
import { useState, useContext } from "react";

export default function IngresoMetaComponet() {
  const { user } = useContext(UserContext);
  const [bien, setBien] = useState("");
  const [monto, setMonto] = useState("");
  const [bienes, setBienes] = useState<{ tipoBien: string; monto: string }[]>(
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bien && monto) {
      setBienes([...bienes, { tipoBien: bien, monto }]);
      setBien("");
      setMonto("");
    }
  };

  const handleDelete = (index: number) => {
    setBienes(bienes.filter((_, i) => i !== index));
  };

  const totalBienes = bienes.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
  );

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
          <h1 className="text-2xl mt-6 font-black">Sabemos que tienes metas</h1>
          <h2 className="text-xl mt-1">¿Que deseas comprar?</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex flex-col mt-5">
                <label className="text-lg font-bold">Nombre del bien</label>
                <Input
                  type="text"
                  value={bien}
                  onChange={(e) => setBien(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-black">
                    $
                  </span>
                  <Input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-10">
                <Button_forms type="submit">GUARDAR</Button_forms>
              </div>
            </div>
          </form>
          <div className="mt-10">
            <h3 className="text-lg font-black text-center">
              Total Bienes: ${totalBienes.toFixed(2)}
            </h3>
          </div>

          {bienes.length > 0 && (
            <div className="grid grid-cols-3 grid-rows-1 gap-40">
              <div className="flex flex-col items-center">
                <Link href="/Menu">
                  <Button_actions_rounded>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-[#C38A01]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </Button_actions_rounded>
                </Link>
                <p className="font-black text-xl text-[#FAB100]">Atras</p>
              </div>
              <div className="">
                <ul>
                  {bienes.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                    >
                      <div className="flex flex-col mr-20">
                        <p className="font-bold text-gray-400">
                          {item.tipoBien}
                        </p>
                        <p className="font-bold">Monto: ${item.monto}</p>
                      </div>
                      <button
                        className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8 flex justify-center items-center"
                        onClick={() => handleDelete(index)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <Link href="/Loading">
                  <Button_actions_rounded>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-[#C38A01]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button_actions_rounded>
                </Link>
                <p className="font-black text-xl text-[#FAB100]">Analizar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
