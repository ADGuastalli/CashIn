"use client";
import React, { useState } from "react";
import DrawerNavAdmin from "@/components/DrawerNav/index copy";
import Usuarios from "@/components/Admin/getUser";
import CreateCourse from "@/components/Admin/addCourse";
import CreateBook from "@/components/Admin/addBook";
import AdminAvailabilityForm from "@/components/Admin/addCalendari";
import InfoAdmin from "@/components/Admin/infoAdmin";
import AddDataService from "@/components/Admin/addDataService";

export default function AdminPage() {
  const [activeComponent, setActiveComponent] = useState("default");

  const renderComponent = () => {
    switch (activeComponent) {
      case "usuarios":
        return <Usuarios />;
      case "cursos":
        return <CreateCourse />;
      case "libros":
        return <CreateBook />;
      case "calendario":
        return <AdminAvailabilityForm />;
      case "MercadoFinanciero":
        return <AddDataService />;
      case "info":
        return <InfoAdmin />;
      default:
        return (
          <div className="flex flex-col justify-center items-center min-h-screen">
            <InfoAdmin />
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
