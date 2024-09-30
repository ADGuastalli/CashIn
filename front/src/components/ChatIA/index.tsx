"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Img1 from "../../public/assets/svg/chatIA.png";
import Img2 from "../../public/assets/svg/budget.svg";
import Img3 from "../../public/assets/svg/tax.svg";
import Img4 from "../../public/assets/svg/piggy-bank.svg";

export default function ChatIALanding() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        className="bg-[#0095a919] rounded-lg flex flex-col justify-center p-5"
        data-aos="fade-up"
      >
        <h2 className="text-xl font-bold text-center">
          Asesoría Instantánea con Inteligencia Artificial
        </h2>
        <h4 className="text-base text-left my-5">
          En nuestra plataforma, no solo tienes acceso a asesoría financiera
          personalizada, sino que también cuentas con el apoyo de CashInBOT, un
          asistente inteligente impulsado por inteligencia artificial. CashInBOT
          está aquí para ayudarte a tomar decisiones financieras mejor
          informadas, de manera rápida y eficiente.
        </h4>
      </div>

      <div
        className="flex flex-col justify-center items-center"
        data-aos="fade-up"
      >
        <Image
          src={Img1}
          alt="Logo1"
          width={150}
          height={150}
          className="w-[30%] sm:w-[150px]"
        />
      </div>

      <div
        className="bg-[#0095a919] rounded-lg flex flex-col justify-center p-5"
        data-aos="fade-up"
      >
        <h2 className="text-xl font-bold text-center">
          ¿Cómo Funciona CashInBOT?
        </h2>
        <h4 className="text-base text-left my-5">
          CashInBOT utiliza la última tecnología en inteligencia artificial para
          procesar tu información financiera y ofrecerte consejos prácticos en
          tiempo real. Ya sea que quieras establecer un presupuesto mensual,
          calcular el crecimiento de tus inversiones o recibir recomendaciones
          sobre cómo reducir tus deudas, CashInBOT está aquí para guiarte.
        </h4>
      </div>

      <div
        className="flex flex-col justify-center items-center md:my-20"
        data-aos="fade-up"
      >
        <Image
          src={Img2}
          alt="Logo2"
          width={120}
          height={120}
          className="w-[25%] sm:w-[120px]"
        />
      </div>

      <div
        className="bg-[#0095a919] rounded-lg flex flex-col justify-center p-5 md:my-20"
        data-aos="fade-up"
      >
        <h2 className="text-xl font-bold text-center">
          Ventajas de la Asesoría con CashInBOT
        </h2>
        <ul className="text-lg text-left my-5">
          <li className="list-disc ml-5">Análisis Financiero Automático</li>
          <li className="list-disc ml-5">Seguridad y Privacidad</li>
          <li className="list-disc ml-5">Mejora Continua</li>
        </ul>
      </div>

      <div
        className="flex flex-col justify-center items-center md:my-20"
        data-aos="fade-up"
      >
        <Image
          src={Img3}
          alt="Logo3"
          width={150}
          height={150}
          className="w-[30%] sm:w-[150px]"
        />
      </div>

      <div
        className="bg-[#0095a919] rounded-lg flex flex-col justify-center p-5"
        data-aos="fade-up"
      >
        <h2 className="text-xl font-bold text-center">Llamada a la Acción</h2>
        <h4 className="text-base text-left my-5">
          No importa cuál sea tu nivel de conocimiento financiero, CashinBot
          está diseñado para guiarte paso a paso hacia una mejor salud
          financiera. Haz clic abajo para iniciar una consulta y recibe asesoría
          inmediata de nuestro bot financiero inteligente.
        </h4>
      </div>

      <div
        className="flex flex-col justify-center items-center"
        data-aos="fade-up"
      >
        <Image
          src={Img4}
          alt="Logo4"
          width={150}
          height={150}
          className="w-[30%] sm:w-[150px]"
        />
      </div>

      <div
        className="bg-[#0095a919] rounded-lg flex flex-col justify-center p-5"
        data-aos="fade-up"
      >
        <h2 className="text-xl font-bold text-center">
          Sección de Preguntas Frecuentes
        </h2>
        <ul className="text-lg text-left my-5">
          <li className="list-disc ml-5 mb-2 text-base">
            ¿Cómo puede CashInBOT ayudarme a mejorar mi presupuesto?
            <p className="font-light text-sm">
              CashInBOT analiza tus ingresos y gastos actuales y te sugiere un
              plan de presupuesto optimizado.
            </p>
          </li>
          <li className="list-disc ml-5 text-base">
            ¿Es seguro compartir mi información financiera con CashInBOT?
            <p className="font-light text-sm mb-2">
              Absolutamente. Toda la información es encriptada para garantizar
              la seguridad.
            </p>
          </li>
          <li className="list-disc ml-5 text-base">
            ¿Puedo usar CashInBOT en cualquier momento?
            <p className="font-light text-sm">
              Sí, CashInBOT está disponible 24/7 para responder tus consultas.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
