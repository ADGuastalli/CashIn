import React, { useState } from 'react'
import { Button_forms } from '../ui/Buttons';
import { Input } from '../ui/Input';
import Swal from 'sweetalert2';

function DeudasFormDashboard() {
    const [deuda, setDeuda] = useState("");
  const [montoDeuda, setMontoDeuda] = useState("");
  const [deudas, setDeudas] = useState<{ tipoDeuda: string; monto: string }[]>(
    []
  );

  const handleSubmitDeudas = (e: React.FormEvent) => {
    e.preventDefault();
    if (deuda && montoDeuda) {
      setDeudas([...deudas, { tipoDeuda: deuda, monto: montoDeuda }]);
      setDeuda("");
      setMontoDeuda("");
    }
  };

  const handleDeleteDeudas = (index: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres eliminar la deuda",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeudas(deudas.filter((_, i) => i !== index));
        Swal.fire("¡Eliminado!", "La deuda ha sido eliminado.", "success");
      }
    });
  };

  const totalDeuda = deudas.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
  );

  
    return (
        <div className="flex-1">
        <form
          onSubmit={handleSubmitDeudas}
          className="flex flex-col justify-center items-center mt-5"
        >
          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold">Tipo de Deuda</label>
            <select
              className="bg-white focus:outline-none focus:ring focus:ring-secondary border border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96"
              value={deuda}
              onChange={(e) => setDeuda(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              <option value="HIPOTECARIOS">HIPOTECARIOS</option>
              <option value="PERSONALES">PERSONALES</option>
              <option value="VEHICULOS">VEHICULOS</option>
              <option value="TARJETAS DE CREDITO">
                TARJETAS DE CREDITO
              </option>
              <option value="PRESTAMOS INFORMALES">
                PRESTAMOS INFORMALES
              </option>
              <option value="COMPRA DE ARTICULOS A CREDITO">
                COMPRA DE ARTICULOS A CREDITO
              </option>
              <option value="PRESTAMOS ESCOLARES">
                PRESTAMOS ESCOLARES
              </option>
              <option value="PRESTAMOS A TERCEROS">
                PRESTAMOS A TERCEROS
              </option>
              <option value="PRESTAMOS FAMILIARES">
                PRESTAMOS FAMILIARES
              </option>
              <option value="OTRAS DEUDAS">OTRAS DEUDAS</option>
            </select>
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-black">
                $
              </span>
              <Input
                type="number"
                value={montoDeuda}
                onChange={(e) => setMontoDeuda(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col mt-10">
            <Button_forms type="submit">GUARDAR</Button_forms>
          </div>
        </form>

        <div className="mt-10">
          <h3 className="text-lg font-black text-center">
            Total Deudas: ${totalDeuda.toFixed(2)}
          </h3>
        </div>

        {deudas.length > 0 && (
          <ul className="mt-5">
            {deudas.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
              >
                <div>
                  <p className="font-bold text-gray-400">
                    {item.tipoDeuda}
                  </p>
                  <p className="font-bold">Monto: ${item.monto}</p>
                </div>
                <button
                  className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8"
                  onClick={() => handleDeleteDeudas(index)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
  )
}

export default DeudasFormDashboard