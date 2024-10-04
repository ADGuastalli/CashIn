import React, { useState } from 'react'
import { Button_forms } from '../ui/Buttons';
import { Input } from '../ui/Input';
import Swal from 'sweetalert2';
import { useCategories } from '@/context/categorias&variablesContext';
import { useDeuda } from '@/context/deudaContext';
import { postDeuda, deleteDeuda } from '@/server/fetchDebt';
import { Deuda } from '@/interface/interfaceData';
import { useParams } from 'next/navigation';
import { descripcionDeudas } from '@/helpers/validaDescripciones';

function DeudasFormDashboard() {
  const {state,dispatch} = useDeuda();
  const [deuda, setDeuda] = useState("");
  const [montoDeuda, setMontoDeuda] = useState("");
  const [deudaType,setDeudaType] = useState("");
  const [interes, setInteres] = useState<number>();
  const [cuota,setCuota] = useState<number>();
  const [montoCuota,setMontoCuota] = useState<number>();

  const [tieneInteres,setTieneInteres] = useState(false)
  const { debtCategory } = useCategories();
  const fecha = new Date();

  const { userId } = useParams();

  const handleSubmitDeudas = (e: React.FormEvent) => {
    e.preventDefault();
    if (deuda && montoDeuda && deudaType) {

      const newDeuda: Deuda = {
        debt_category: deudaType,
        debt: deuda,
        mount: parseInt(montoDeuda),
        date: fecha.toLocaleDateString(),
        rate: interes ? interes : 0,
        cuote: cuota ? cuota : 0,
        mount_cuote: montoCuota ? montoCuota : 0,
        recurrence: false,
      }
      postDeuda(newDeuda,userId as string)
      dispatch({
        type: "ADD_DEUDA",
        payload: {
          tipoDeuda: deudaType,
          descripcionDeuda: deuda,
          monto: montoDeuda,
          interes: interes ? interes : undefined,
          cuote: cuota ? cuota : undefined,
          mount_cuote: montoCuota ? montoCuota : undefined
        }
      })
      setDeudaType("")
      setDeuda("");
      setMontoDeuda("");
      setCuota(undefined);
      setInteres(undefined);
      setMontoCuota(undefined);
    }
  };

  const handleDeleteDeudas = (index: number, debt_id: string | undefined) => {
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
        if(debt_id){
          deleteDeuda(debt_id)
        }
        dispatch({
          type: "DELETE_DEUDA",
          payload: index
        })
        Swal.fire("¡Eliminado!", "La deuda ha sido eliminado.", "success");
      }
    });
  };

  const totalDeuda = state.deudas.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
  );

  
    return (
        <div className="flex-1">
          <div className='flex m-1'>
            <label >Agregar si tiene algun tipo de interes</label>
            <input type="checkbox" onChange={()=>setTieneInteres(!tieneInteres)} />
          </div>
        <form
          onSubmit={handleSubmitDeudas}
          className="flex flex-col justify-center items-center mt-5"
        >

          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold">Tipo de Deuda</label>
            <select
              className="bg-white focus:outline-none focus:ring focus:ring-secondary border border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96"
              value={deudaType}
              onChange={(e) => setDeudaType(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              {
                  debtCategory.map((debt, index)=>{
                    return(
                      <option value={debt} key={index}>{debt}</option>
                    )
                  })
                 }
            </select>
          </div>
          <div className="flex flex-col mt-5">
                    <label className="text-lg font-bold">descripcion de la Deuda</label>
                    <select
                      className="bg-white focus:outline-none focus:ring focus:ring-secondary border border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96"
                      value={deuda}
                      onChange={(e) => setDeuda(e.target.value)}
                    >
                      <option value="">Seleccione una opción</option>
                      {
                        descripcionDeudas.map((item, index) => {
                          if (item.categoria === deudaType) {
                            return item.subCategorias.map((subCategoria, subIndex) => (
                              <option value={subCategoria} key={`${index}-${subIndex}`}>
                                {subCategoria}
                              </option>
                            ));
                          }
                          return null; 
                        })
                      }
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

          {
            tieneInteres && (
              <>
                  <div className="flex flex-col">
                    <div className="relative">
                      <Input
                        placeholder='interes%'
                        type="number"
                        value={interes}
                        onChange={(e) => setInteres(parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative">
                      <Input
                        placeholder='cantidad de cuotas..'
                        type="number"
                        value={cuota}
                        onChange={(e) => setCuota(parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative">
                      <Input
                        placeholder='monto de las cuotas'
                        type="number"
                        value={montoCuota}
                        onChange={(e) => setMontoCuota(parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
              </>
            )
          }
          <div className="flex flex-col mt-10">
            <Button_forms type="submit">GUARDAR</Button_forms>
          </div>
        </form>

        <div className="mt-10">
          <h3 className="text-lg font-black text-center">
            Total Deudas: ${totalDeuda.toFixed(2)}
          </h3>
        </div>

        {state.deudas.length > 0 && (
          <ul className="mt-5">
            {state.deudas.map((item, index) => (
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
                  onClick={() => handleDeleteDeudas(index, item.debt_id)}
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