import React from 'react'
import Swal from 'sweetalert2';

type Meta = {
    tipoValor: string;
    monto: string;
    tiempoEstimado: string;
    porcentageAhorro: string;
  }; 
interface propsMeta {
    misMetas: Meta;
    setMisMetas: React.Dispatch<React.SetStateAction<Meta[]>>;
}
function CardGoal({misMetas, setMisMetas} : propsMeta) {

    const handleDelete = () => {
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
            setMisMetas((prev) =>
                prev.filter(
                  (meta) =>
                    meta.tipoValor !== misMetas.tipoValor ||
                    meta.monto !== misMetas.monto ||
                    meta.tiempoEstimado !== misMetas.tiempoEstimado ||
                    meta.porcentageAhorro !== misMetas.porcentageAhorro
                )
              );
            Swal.fire("¡Eliminado!", "El ingreso ha sido eliminado.", "success");
          }
        });
      };

  return (
    <div className="flex items-center justify-center my-6">
        <div className='flex items-center text-xs text-slate-900 ml-2'>
            <button className='inline-flex items-center justify-center aspect-square rounded-full
             bg-bad_status px-2'
             onClick={handleDelete}>
                X
            </button>
        </div>
        <div className='flex-1 m-2 '>
            <div className="flex items-start justify-around m-2">
            <h4 className="font-medium text-sm mr-auto text-gray-700 flex items-center">
                {misMetas.tipoValor}
            </h4>
            <span className="px-2 py-1 rounded-lg bg-red-50 text-red-500 text-xs">
                6.2 / 10
            </span>
            </div>
                <div className="overflow-hidden bg-blue-50 h-1.5 rounded-full w-full">
                <span
                    className="h-full bg-actions w-full block rounded-full"
                    style={{width: "62%"}}
                ></span>
                </div>
        </div>
        <div className='flex flex-col text-xs ml-2'>
            <span>Ahorrado: data.ahorrado</span>
            <span>Precio: data.precio</span>
            <p className='text-[10px] text-gray-500'>progreso <span className='text-actions'> 62% </span></p>
        </div>
  </div>
  )
}

export default CardGoal