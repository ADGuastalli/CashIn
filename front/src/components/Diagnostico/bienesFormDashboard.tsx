import React, { useState } from 'react'
import { Input } from '../ui/Input';
import { Button_forms } from '../ui/Buttons';
import Swal from 'sweetalert2';

function BienesFormDashboard() {
    const [bien, setBien] = useState("");
    const [montoBien, setMontoBien] = useState("");
    const [bienes, setBienes] = useState<{ tipoBien: string; monto: string }[]>(
      []
    );

    const handleSubmitBienes = (e: React.FormEvent) => {
        e.preventDefault();
        if (bien && montoBien) {
          setBienes([...bienes, { tipoBien: bien, monto: montoBien }]);
          setBien("");
          setMontoBien("");
        }
      };

    const handleDeleteBienes = (index: number) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Quieres eliminar el bien",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
        setBienes(bienes.filter((_, i) => i !== index));
        Swal.fire("¡Eliminado!", "El bien ha sido eliminado.", "success");
        }
    });
    };
    
    
    const totalBienes = bienes.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
    );

  return (
    <div className="flex-1">
        <form
        onSubmit={handleSubmitBienes}
        className="flex flex-col justify-center items-center mt-5"
        >
        <div className="flex flex-col mt-5">
            <label className="text-lg font-bold">Bienes</label>
            <Input
            type="text"
            value={bien} // Aquí debes usar 'bien', no 'bienes'
            onChange={(e) => setBien(e.target.value)} // Actualiza el valor de 'bien'
            />
        </div>

        <div className="flex flex-col">
            <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-black">
                $
            </span>
            <Input
                type="number"
                value={montoBien} // Este es el monto del bien
                onChange={(e) => setMontoBien(e.target.value)} // Actualiza el valor del monto del bien
            />
            </div>
        </div>

        <div className="flex flex-col mt-10">
            <Button_forms type="submit">GUARDAR</Button_forms>
        </div>
        </form>

        <div className="mt-10">
        <h3 className="text-lg font-black text-center">
            Total en Bienes: ${totalBienes.toFixed(2)}
        </h3>
        </div>

        {bienes.length > 0 && (
        <ul className="mt-5">
            {bienes.map((item, index) => (
            <li
                key={index}
                className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
            >
                <div>
                <p className="font-bold text-gray-400">{item.tipoBien}</p>
                <p className="font-bold">Monto: ${item.monto}</p>
                </div>
                <button
                className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8"
                onClick={() => handleDeleteBienes(index)} // Asegúrate de eliminar el bien correcto
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

export default BienesFormDashboard