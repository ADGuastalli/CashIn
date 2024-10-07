import React from "react";
import MercadoFinancieroComponet from "@/components/MercadoFinanciero";
import { Button_Home } from "@/components/ui/Buttons";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import ImgBank from "../../public/assets/svg/budget.svg";
import ImgBank2 from "../../public/assets/svg/transfer.svg";
import ImgBank3 from "../../public/assets/svg/tax.svg";

export default function MercadoFinanciero() {
  return (
    <div>
      <div className="mt-3 ml-3">
        <Link href="/">
          <Button_Home />
        </Link>
      </div>
      <div className="flex flex-col items-center min-h-screen px-5 mb-20">
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
          className="mt-2"
        />
        <h1 className="text-3xl font-bold text-center mt-10">
          Bienvenido a Nuestro Mercado Financiero
        </h1>

        <div className="flex flex-col items-center justify-center mt-20 mb-10 px-40">
          <div className="grid grid-cols-5 grid-rows-2 gap-4">
            <div className="p-5 bg-[#e0f7fa] rounded-lg">
              <h2 className="text-xl font-bold text-center">
                Explora Nuestros Bancos
              </h2>
              <p className="text-base text-left mt-2  text-black">
                Accede a una lista de bancos de renombre que ofrecen una amplia
                gama de servicios. Ya sea que estés buscando una cuenta de
                ahorros, un préstamo personal o un crédito hipotecario, tenemos
                las opciones adecuadas para ti.
              </p>
            </div>
            <div className=" col-start-2 flex flex-col justify-center items-center">
              <Image
                src={ImgBank}
                alt="Logo"
                width={100}
                height={100}
                className="mt-2"
              />
            </div>
            <div className="col-start-3 p-5 bg-[#e0f7fa] rounded-lg">
              <h2 className="text-xl font-bold text-center">
                Servicios Financieros a Tu Alcance
              </h2>
              <p className="text-base text-left mt-2  text-black">
                Desde cuentas de ahorro hasta préstamos comerciales, nuestros
                productos están diseñados para satisfacer tus necesidades
                financieras. Compara los servicios y elige el que mejor se
                adapte a tu estilo de vida.
              </p>
            </div>
            <div className="col-start-4 flex flex-col justify-center items-center">
              <Image
                src={ImgBank2}
                alt="Logo"
                width={100}
                height={100}
                className="mt-2"
              />
            </div>
            <div className="col-start-5 p-5 bg-[#e0f7fa] rounded-lg">
              <h2 className="text-xl font-bold text-center">
                Tasas de Interés Competitivas
              </h2>
              <p className="text-base text-left mt-2  text-black">
                Mantente informado sobre las tasas de interés más competitivas
                en el mercado. Te ayudamos a entender cómo cada tasa puede
                afectar tus ahorros o préstamos, asegurando que tomes la mejor
                decisión financiera.
              </p>
            </div>
            <div className="col-start-2 row-start-2 p-5 bg-[#e0f7fa] rounded-lg">
              <h2 className="text-xl font-bold text-center">
                Beneficios Adicionales
              </h2>
              <p className="text-base text-left mt-2 text-black">
                Descubre los beneficios adicionales que cada banco y servicio
                ofrece. Desde programas de recompensas hasta asesoramiento
                financiero personalizado, estamos aquí para maximizar tu
                experiencia bancaria.
              </p>
            </div>
            <div className="col-start-3 row-start-2 flex flex-col justify-center items-center">
              <Image
                src={ImgBank3}
                alt="Logo"
                width={100}
                height={100}
                className="mt-2"
              />
            </div>
            <div className="col-start-4 row-start-2 p-5 bg-[#e0f7fa] rounded-lg">
              <h2 className="text-xl font-bold text-center">
                Transparencia y Comparación
              </h2>
              <p className="text-base text-left mt-2  text-black">
                Nuestra plataforma te permite comparar diferentes productos y
                servicios fácilmente. Obtén toda la información necesaria para
                realizar una comparación justa y elige la opción que más te
                convenga.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-20 mx-40">
          <MercadoFinancieroComponet />
        </div>
      </div>
    </div>
  );
}
