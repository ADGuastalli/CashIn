"use client";
import React, { useState, useEffect } from "react";
import { getAllDataService, IDataService } from "@/server/fetchDataService";
import { getAllBanks, IBank } from "@/server/fetchBank";
import { getAllServices, IService } from "@/server/fetchService";

// Definir un tipo para las claves permitidas de IDataService
type SortableKeys =
  | keyof IDataService
  | "bank_id"
  | "service_id"
  | "secuence"
  | "opening_amount"
  | "interest_rate"
  | "trade_name";

export default function MercadoFinancieroComponet() {
  const [dataServices, setDataServices] = useState<IDataService[]>([]);
  const [banks, setBanks] = useState<IBank[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  } | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const [allDataServices, allBanks, allServices] = await Promise.all([
        getAllDataService(),
        getAllBanks(),
        getAllServices(),
      ]);
      setDataServices(allDataServices);
      setBanks(allBanks);
      setServices(allServices);
    };

    fetchInitialData();
  }, []);

  const sortedDataServices = React.useMemo(() => {
    const sortableItems = [...dataServices];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return (
            aValue.localeCompare(bValue) *
            (sortConfig.direction === "ascending" ? 1 : -1)
          );
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return (
            (aValue - bValue) * (sortConfig.direction === "ascending" ? 1 : -1)
          );
        } else {
          return 0; // En caso de que no sean del mismo tipo
        }
      });
    }
    return sortableItems;
  }, [dataServices, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => requestSort("bank_id")}
            >
              Banco{" "}
              {sortConfig?.key === "bank_id" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => requestSort("service_id")}
            >
              Servicio{" "}
              {sortConfig?.key === "service_id" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => requestSort("secuence")}
            >
              Secuencia{" "}
              {sortConfig?.key === "secuence" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => requestSort("opening_amount")}
            >
              Monto Apertura{" "}
              {sortConfig?.key === "opening_amount" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => requestSort("interest_rate")}
            >
              Tasa de Interés{" "}
              {sortConfig?.key === "interest_rate" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
            <th className="border border-gray-300 px-4 py-2">Requisitos</th>
            <th className="border border-gray-300 px-4 py-2">
              Beneficios Ofrecidos
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => requestSort("trade_name")}
            >
              Nombre Comercial{" "}
              {sortConfig?.key === "trade_name" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedDataServices.map((dataService) => {
            const bank = banks.find((b) => b.bank_id === dataService.bank_id);
            const service = services.find(
              (s) => s.service_id === dataService.service_id
            );

            return (
              <tr key={dataService.data_service}>
                <td className="border border-gray-300 px-4 py-2">
                  {bank ? bank.bank : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {service ? service.service : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {dataService.secuence}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {dataService.opening_amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {dataService.interest_rate} %
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {dataService.requeriment}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {dataService.benefit_offered}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {dataService.trade_name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
