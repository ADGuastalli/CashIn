"use client";
import React, { useEffect } from "react";
import { Button_LeerMAs } from "../ui/Buttons";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CursosComponet() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación (1000ms = 1s)
      once: true, // La animación solo sucede una vez al hacer scroll hacia abajo
    });
  }, []);

  return (
    <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto">
      {/* Curso 1: Domina tus Finanzas Personales */}
      <div
        className="col-span-1 lg:col-span-2 bg-white p-5 rounded-lg flex flex-col justify-center"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-bold text-center">
          Domina tus Finanzas Personales
        </h3>
        <h4 className="text-lg font-bold text-left my-5">
          Objetivo:{" "}
          <span className="font-normal">
            Enseñar los conceptos básicos de administración del dinero, manejo
            de ingresos y gastos, y cómo construir un presupuesto personal
            eficiente.
          </span>
        </h4>
        <ul className="text-lg font-bold text-left my-5">
          Temas:
          <li className="list-disc ml-5">
            Introducción al sistema financiero​
          </li>
          <li className="list-disc ml-5">Cómo elaborar un presupuesto​</li>
          <li className="list-disc ml-5">
            Importancia del ahorro y métodos de ahorro​
          </li>
          <li className="list-disc ml-5">Control de gastos innecesarios​</li>
        </ul>
        <h4 className="text-lg font-bold text-left my-5">
          Duracion: <span className="font-normal">8 horas</span>{" "}
        </h4>
        <h4 className="text-lg font-bold text-left my-2">
          Nivel:{" "}
          <span className="font-bold py-1 bg-green-400 p-2 rounded-xl text-white">
            Principiante
          </span>{" "}
        </h4>
        <div className="flex justify-center">
          <Button_LeerMAs />
        </div>
      </div>

      {/* Curso 2: Ahorro e Inversiones para el Futuro */}
      <div className="bg-white p-5 rounded-lg flex flex-col" data-aos="fade-up">
        <h3 className="text-xl font-bold text-center">
          Ahorro e Inversiones para el Futuro
        </h3>
        <h4 className="text-lg font-bold text-left my-5">
          Objetivo:{" "}
          <span className="font-normal">
            Explorar métodos de ahorro y estrategias de inversión para lograr la
            libertad financiera.
          </span>
        </h4>
        <ul className="text-lg font-bold text-left my-5">
          Temas:
          <li className="list-disc ml-5">Métodos de ahorro eficiente​​</li>
          <li className="list-disc ml-5">
            Introducción a las inversiones: tipos y beneficios​​
          </li>
          <li className="list-disc ml-5">Estrategias de diversificación​​</li>
          <li className="list-disc ml-5">
            Cálculo del rendimiento de inversiones y riesgo financiero​​
          </li>
        </ul>
        <h4 className="text-lg font-bold text-left my-5">
          Duracion: <span className="font-normal">10 horas</span>{" "}
        </h4>
        <h4 className="text-lg font-bold text-left my-2">
          Nivel:{" "}
          <span className="font-bold py-1 bg-yellow-400 p-2 rounded-xl text-white">
            Intermedio
          </span>{" "}
        </h4>
        <div className="flex justify-center">
          <Button_LeerMAs />
        </div>
      </div>

      {/* Curso 3: Planificación Financiera y Gestión de Deudas */}
      <div className="bg-white p-5 rounded-lg flex flex-col" data-aos="fade-up">
        <h3 className="text-xl font-bold text-center">
          Planificación Financiera y Gestión de Deudas
        </h3>
        <h4 className="text-lg font-bold text-left my-5">
          Objetivo:{" "}
          <span className="font-normal">
            Desarrollar una planificación financiera robusta y efectiva,
            incluyendo el manejo adecuado de deudas y la optimización de los
            recursos disponibles.
          </span>
        </h4>
        <ul className="text-lg font-bold text-left my-5">
          Temas:
          <li className="list-disc ml-5">
            Planificación financiera personal o familiar​​
          </li>
          <li className="list-disc ml-5">
            Cómo salir de deudas de manera eficiente​
          </li>
          <li className="list-disc ml-5">
            Planificación a largo plazo: jubilación, objetivos financieros​​
          </li>
          <li className="list-disc ml-5">
            Inteligencia financiera aplicada a la toma de decisiones​​
          </li>
        </ul>
        <h4 className="text-lg font-bold text-left my-5">
          Duracion: <span className="font-normal">12 horas</span>{" "}
        </h4>
        <h4 className="text-lg font-bold text-left my-2">
          Nivel:{" "}
          <span className="font-bold py-1 bg-red-400 p-2 rounded-xl text-white">
            Avanzado
          </span>{" "}
        </h4>
        <div className="flex justify-center">
          <Button_LeerMAs />
        </div>
      </div>

      {/* Curso 4: Finanzas para Emprendedores y Profesionales */}
      <div
        className="col-span-1 lg:col-span-2 bg-white p-5 rounded-lg flex flex-col justify-center"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-bold text-center">
          Finanzas para Emprendedores y Profesionales
        </h3>
        <h4 className="text-lg font-bold text-left my-5">
          Objetivo:{" "}
          <span className="font-normal">
            Ofrecer herramientas financieras específicas para emprendedores y
            profesionales independientes, ayudándolos a tomar mejores decisiones
            en la gestión financiera de sus negocios.
          </span>
        </h4>
        <ul className="text-lg font-bold text-left my-5">
          Temas:
          <li className="list-disc ml-5">
            Introducción a la gestión financiera empresarial​​
          </li>
          <li className="list-disc ml-5">
            Cómo estructurar el capital y el flujo de caja​​
          </li>
          <li className="list-disc ml-5">
            Opciones de financiamiento y fondos de inversión​​
          </li>
          <li className="list-disc ml-5">Impuestos y deducciones fiscales​</li>
        </ul>
        <h4 className="text-lg font-bold text-left my-5">
          Duracion: <span className="font-normal">16 horas</span>{" "}
        </h4>
        <h4 className="text-lg font-bold text-left my-2">
          Nivel:{" "}
          <span className="font-bold bg-blue-400 p-2 py-1 rounded-xl text-white">
            Especializado
          </span>{" "}
        </h4>
        <div className="flex justify-center">
          <Button_LeerMAs />
        </div>
      </div>
    </div>
  );
}
