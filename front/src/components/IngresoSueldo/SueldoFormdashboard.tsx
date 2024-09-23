"use client";
import React, {  useState } from "react";
//import { UserContext } from "../../context/userContext";
import {
  Button_forms,
} from "../ui/Buttons";
import { Input } from "../ui/Input";
import Swal from "sweetalert2";

export default function SueldoFromDashboard() {
  //const { user } = useContext(UserContext);
  const [sueldo, setSueldo] = useState("");
  const [monto, setMonto] = useState("");
  const [sueldos, setSueldos] = useState<
    { tipoSueldo: string; monto: string }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sueldo && monto) {
      setSueldos([...sueldos, { tipoSueldo: sueldo, monto }]);
      setSueldo("");
      setMonto("");
    }
  };

  const handleDelete = (index: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres eliminar ese ingreso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setSueldos(sueldos.filter((_, i) => i !== index));
        Swal.fire("¡Eliminado!", "El ingreso ha sido eliminado.", "success");
      }
    });
  };

  // Calcular el total de las deudas
  const totalIngreso = sueldos.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
  );

  return (
   <div>
    <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex flex-col mt-5">
                <label className="text-lg font-bold">Tipo de Ingreso</label>
                <select
                  className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
             border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96 appearance-none leading-normal
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
                  value={sueldo}
                  onChange={(e) => setSueldo(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="INGRESO 1">INGRESO 1</option>
                  <option value="INGRESO 2">INGRESO 2</option>
                  <option value="INGRESOSO POR INTERESES">
                    INGRESOSO POR INTERESES
                  </option>
                  <option value="BONIFICACION POR LEY">
                    BONIFICACION POR LEY
                  </option>
                  <option value="INCENTIVOS Y HORAS EXTRAS">
                    INCENTIVOS Y HORAS EXTRAS
                  </option>
                  <option value="VACACIONES">VACACIONES</option>
                  <option value="REEMBOLSOSS">REEMBOLSOS</option>
                  <option value="NEGOCIOS">NEGOCIOS</option>
                  <option value="DIVISION DE ACCIONES">
                    DIVISION DE ACCIONES
                  </option>
                  <option value="PENSION">PENSION</option>
                </select>
              </div>

              <div className="flex flex-col">
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 pl-3 flex items-center font-black">
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
              Total Ingresos: ${totalIngreso.toFixed(2)}
            </h3>
          </div>
          {sueldos.length > 0 && 
            <div>
            <ul>
                {sueldos.map((item, index) => (
                <li
                    key={index}
                    className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                >
                    <div className="flex flex-col mr-20">
                    <p className="font-bold text-gray-400">
                        {item.tipoSueldo}
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
          }
          
   </div>
  );
}
