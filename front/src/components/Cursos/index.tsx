"use client";
import React, { useEffect, useState } from "react";
import { API } from "@/helpers/helper";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

interface Curso {
  courseId: number; // Cambié a number para que coincida con la base de datos
  title: string;
  description: string;
  topics: string[]; // Cambia esto a un array de strings
  duration: string;
  level: string;
  location: string;
  startDate: string; // Fecha en formato ISO
}

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

const getAllCourses = async (): Promise<Curso[]> => {
  try {
    const response = await fetch(`${API}/course`, {
      method: "GET",
    });
    const data: Curso[] = await response.json();
    return data; // Devuelve los cursos directamente
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    return []; // Retorna un array vacío en caso de error
  }
};

const CursosComponet: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchCourses = async () => {
      const data = await getAllCourses();
      setCursos(data);
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto">
        {cursos.length === 0 ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-200 p-5 rounded-lg text-center">
            <h3 className="text-xl font-bold">
              ¡Estate Atento! Proximamente podras encontrar los cursos
              disponibles.
            </h3>
          </div>
        ) : (
          cursos.map((curso) => (
            <div
              key={curso.courseId}
              className="bg-white p-5 rounded-lg flex flex-col justify-center"
              data-aos="fade-up"
            >
              <h3 className="text-xl font-bold text-center">{curso.title}</h3>
              <h4 className="text-lg font-bold text-left my-5">
                Objetivo:{" "}
                <span className="font-normal">{curso.description}</span>
              </h4>
              <h4 className="text-lg font-bold text-left my-5">
                Temas Principales:{" "}
                <span className="font-normal">{curso.topics}</span>{" "}
                {/* Cambia a un string */}
              </h4>
              <h4 className="text-lg font-bold text-left my-5">
                Duración: <span className="font-normal">{curso.duration}</span>
              </h4>
              <h4 className="text-lg font-bold text-left my-2">
                Nivel:{" "}
                <span
                  className={`font-bold py-1 p-2 rounded-xl text-white ${
                    curso.level === "Principiante"
                      ? "bg-green-400"
                      : curso.level === "Intermedio"
                      ? "bg-yellow-400"
                      : curso.level === "Avanzado"
                      ? "bg-red-400"
                      : curso.level === "Especializado"
                      ? "bg-blue-400"
                      : ""
                  }`}
                >
                  {curso.level}
                </span>{" "}
              </h4>
              <h4 className="text-lg font-bold text-left my-5">
                Ubicación: <span className="font-normal">{curso.location}</span>
              </h4>
              <h4 className="text-lg font-bold text-left my-5">
                Fecha de Inicio:{" "}
                <span className="font-normal">
                  {formatDate(curso.startDate)}
                </span>
              </h4>
              <Link href={`/Contacto`}>
                <button
                  className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105"
                >
                  Contactar
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CursosComponet;
