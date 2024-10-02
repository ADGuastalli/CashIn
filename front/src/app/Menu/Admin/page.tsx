"use client";
import React, { useState } from "react";
import DrawerNavAdmin from "@/components/DrawerNav/index copy";
import Usuarios from "@/components/Admin/getUser";
import CreateCourse from "@/components/Admin/addCourse";

export default function AdminPage() {
  const [activeComponent, setActiveComponent] = useState("default");

  const renderComponent = () => {
    switch (activeComponent) {
      case "usuarios":
        return <Usuarios />;
      case "cursos":
        return <CreateCourse />;
      default:
        return (
          <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold text-center mt-4">
              Panel del Administrador/a
            </h1>
            <p className="text-lg text-center mt-2">
              {" "}
              En el Panel del Administrador/a podras ver la cantidad de usuarios
              registrados, como ver sus descripciones y poder eliminarlos de ser
              requerido. Ademas podras publicar nuevos cursos y eliminarlos.{" "}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Barra de navegación con ancho fijo */}
      <DrawerNavAdmin setActiveComponent={setActiveComponent} />

      {/* Contenido dinámico ajustado con un margen izquierdo */}
      <div className="flex-1 ml-64 p-4">{renderComponent()}</div>
    </div>
  );
}
