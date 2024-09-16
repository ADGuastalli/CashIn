"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import Loading1 from "../../public/assets/svg/loading1.svg";
import Loading2 from "../../public/assets/svg/loading2.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoadingComponent() {
  const [fadeOutLoading1, setFadeOutLoading1] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOutLoading1(true);
    }, 3000);

    const timer2 = setTimeout(() => {
      router.push("/Menu");
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

  return (
    <div className="bg-[#0095A941] min-h-screen flex flex-col justify-center items-center relative">
      <div className="absolute top-5 left-5">
        <Image src={Logo} alt="Logo" width={200} height={200} />
      </div>
      <div className="relative flex justify-center items-center w-full h-full">
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-3000 ease-in-out ${
            fadeOutLoading1 ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image src={Loading1} alt="Loading1" width={120} height={120} />
          <span className="mt-2 text-xl">Analizando tus Finanzas ...</span>
        </div>
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-3000 ease-in-out ${
            fadeOutLoading1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={Loading2} alt="Loading2" width={120} height={120} />
          <span className="mt-2 text-xl">Estamos casi listos ...</span>
        </div>
      </div>
    </div>
  );
}
