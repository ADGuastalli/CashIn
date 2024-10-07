import React, { useState } from 'react'
import { Input } from '../ui/Input';
import { Button_forms } from '../ui/Buttons';
import Swal from 'sweetalert2';
import { useCategories } from '@/context/categorias&variablesContext';
import { usePersonalProperty } from '@/context/personalPropertyContext';
import { postBien , deleteBien } from '@/server/fetchBien';
import { PersonalProperty } from '@/interface/interfaceData';
import { useParams } from 'next/navigation';
import { descripcionBienes } from '@/helpers/validaDescripciones';
function BienesFormDashboard() {
    const [bien, setBien] = useState("");
    const [montoBien, setMontoBien] = useState("");
    const [biencategory, setBiencategory] = useState("");

    const { state, dispatch} = usePersonalProperty();
    const { personalProperty } = useCategories();
    const fecha = new Date();
    const { userId } = useParams();
    const handleSubmitBienes = (e: React.FormEvent) => {
        e.preventDefault();

        if (bien && montoBien && biencategory) {

            const bienes:PersonalProperty = {
                personal_property_type: biencategory,
                personal_property: bien,
                mount: parseInt(montoBien),
                date: fecha.toLocaleDateString()
            } 
            postBien(bienes , userId as string)
            dispatch({
                type: "ADD_BIEN",
                payload:{
                    personal_property_type: biencategory,
                    personal_property: bien,
                    mount: montoBien,
                    date: fecha.toLocaleDateString()
                }
            })
          setBiencategory("")  
          setBien("");
          setMontoBien("");
        }
      };

    const handleDeleteBienes = (index: number, personal_property_id: string | undefined) => {
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
            if(personal_property_id){
                deleteBien(personal_property_id)
            }
            dispatch({
                type:"DELETE_BIEN",
                payload: index
            })
        Swal.fire("¡Eliminado!", "El bien ha sido eliminado.", "success");
        }
    });
    };
    
    
    const totalBienes = state.bienes.reduce(
    (acc, item) => acc + parseFloat(item.mount),
    0
    );

  return (
    <div className="flex-1">
        <form
        onSubmit={handleSubmitBienes}
        className="flex flex-col justify-center items-center mt-5"
        >
            <div className="flex flex-col mt-5">
            <label className="text-lg font-bold">Tipo de Bien</label>
            <select
            className="bg-white focus:outline-none focus:ring focus:ring-secondary border border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96"
            value={biencategory}
            onChange={(e) => setBiencategory(e.target.value)}
            >
                <option value="">Seleccione una opción</option>
            {
                personalProperty?.map((bien,index)=>{
                    return(
                    <option value={bien} key={index}>{bien}</option>
                    )
                })
            }
            </select>
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold">Descripcion del Bien</label>
            <select
            className="bg-white focus:outline-none focus:ring focus:ring-secondary border border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96"
            value={bien}
            onChange={(e) => setBien(e.target.value)}
            >
                <option value="">Seleccione una opción</option>
                {
                    descripcionBienes.map((item, index) => {
                        if (item.categoria === biencategory) {
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

        {state.bienes.length > 0 && (
        <ul className="mt-5">
            {state.bienes.map((item, index) => (
            <li
                key={index}
                className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
            >
                <div>
                <p className="font-bold text-gray-400">{item.personal_property}</p>
                <p className="font-bold">Monto: ${item.mount}</p>
                </div>
                <button
                className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8"
                onClick={() => handleDeleteBienes(index,item.personal_property_id)} // Asegúrate de eliminar el bien correcto
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