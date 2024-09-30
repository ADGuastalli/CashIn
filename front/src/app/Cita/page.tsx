import React from "react";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import Image from "next/image";
import Link from "next/link";
import { Button_Menu } from "@/components/ui/Buttons";
import ConcretarCita from "@/components/CitaCalendario";

const CalendarPage = () => {
  return (
    <div>
      <Link href="/Menu">
        <Button_Menu />
      </Link>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {" "}
        {/* Añadido px-4 para margen horizontal */}
        <div className="flex flex-col items-center">
          <Image
            src={Logo}
            alt="Logo"
            width={250}
            height={250}
            className="mt-2"
          />
          <h1 className="text-3xl font-bold text-center mt-4">
            Reserva la cita en CASHIN
          </h1>

          <div className="flex flex-col items-center justify-center mt-20">
            <ConcretarCita />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
