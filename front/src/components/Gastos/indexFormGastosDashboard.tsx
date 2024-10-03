"use client";
import React, { useState } from "react";
import ModalSelectGastos from "./ModalSelectGastos";
import {
  Button_forms,
} from "../ui/Buttons";
import { Input } from "../ui/Input";
import { useGastos } from "../../context/gastosContext";
import Swal from "sweetalert2";
import { postExpense } from "@/server/fetchExpense";
import { Expense } from "@/interface/interfaceData";
import { useParams } from "next/navigation";
import { deleteGasto } from "@/server/fetchExpense";

function FormGastosDashboard() {

  const { state, dispatch } = useGastos();
  const [monto, setMonto] = useState<string>("");
  const [subtipoSeleccionado, setSubtipoSeleccionado] = useState<string>("");
  const [tipoPago, setTipoPago] = useState<string>("");
  const [gastos,setGastos] = useState<Expense>();
  const fecha = new Date();
  const tipoGasto = state.selectedTipoGasto || "";
  
  const { userId } = useParams();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tipoGasto = state.selectedTipoGasto || "";

    if (tipoGasto && monto && subtipoSeleccionado && tipoPago) {
      
      if(gastos){
         postExpense(gastos,userId as string );
      } 
      dispatch({
        type: "ADD_GASTO",
        payload: {
          tipoGasto,
          monto,
          subtipoGasto: subtipoSeleccionado,
          tipoPago,
        },
      });
      setMonto("");
      setSubtipoSeleccionado("");
      setTipoPago("");
      setGastos({
        expense_category: '',
        expense: '',
        mount: 0,
        pay_method: '',
        date: fecha.toLocaleDateString(),
      })
    }
  };
  
  const resetModal = () => {
    dispatch({
      type: "CLEAN_TIPO_GASTO"
    })
    setMonto("");
      setSubtipoSeleccionado("");
      setTipoPago("");
  }

  const handleDelete = (index: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres eliminar este gasto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "DELETE_GASTO",
          payload: index,
        });
        Swal.fire("¡Eliminado!", "El gasto ha sido eliminado.", "success");
      }
    });
  };
  
  const handleDeleteBD = (id:string, index:number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres eliminar este gasto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGasto(id)
        dispatch({
          type: "DELETE_GASTO",
          payload: index,
        });
        Swal.fire("¡Eliminado!", "El gasto ha sido eliminado.", "success");
      }
    });
  }
  const handleChangesetSubtipoSeleccionado = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSubtipoSeleccionado(value);
    updateGastos(value, tipoPago, monto,tipoGasto,);
  };

  const handleChangesetmonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMonto(value);
    updateGastos(subtipoSeleccionado, tipoPago, value,tipoGasto,);
  };

  const handleChangesetTipoPago = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTipoPago(value);
    updateGastos(subtipoSeleccionado, value, monto,tipoGasto,);
  };

  const updateGastos = (subtipo: string, pago: string, montoValue: string,tipoGasto: string) => {
    setGastos({
      expense_category: tipoGasto,
      expense: subtipo,
      mount: parseInt(montoValue),
      pay_method: pago,
      date: fecha.toLocaleDateString()
    });
  };

  return (
    <div className="">
      {!state.selectedTipoGasto && (<ModalSelectGastos />)}
         <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex flex-col mt-5">
              <label className="text-lg font-bold">Tipo de Gasto</label>
              <Input value={state.selectedTipoGasto || ""} readOnly />
            </div>

            {state.subtipos && state.subtipos.length > 0 && (
              <div className="mt-4">
                <p>{state.selectedTipoGasto}</p>
                <label className="text-lg font-bold">Subtipo de Gasto</label>
                <select
                  className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
             border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96 appearance-none leading-normal "
                  value={subtipoSeleccionado}
                  onChange={handleChangesetSubtipoSeleccionado}
                >
                  <option value="">Selecciona sub Categoria</option>
                  {state.subtipos.map((subtipo, index) => (
                    <option key={index} value={subtipo}>
                      {subtipo}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex flex-col mt-5">
              <label className="text-lg font-bold">Forma de Pago</label>
              <select
                className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
             border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96 appearance-none leading-normal"
                value={tipoPago}
                onChange={handleChangesetTipoPago}
              >
                <option value="">Seleccione una opción</option>
                <option value="EFECTIVO">EFECTIVO</option>
                <option value="TARJETA DE DEBIDO">TARJETA DE DEBIDO</option>
                <option value="TARJETA DE CREDITO">TARJETA DE CREDITO</option>
                <option value="CREDITO">CREDITO</option>
                <option value="CHEQUE">CHEQUE</option>
                <option value="TRANSFERENCIA ELECTRONICA">
                  TRANSFERENCIA ELECTRONICA
                </option>
                <option value="OTROS">OTROS</option>
              </select>
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-black">
                  $
                </span>
                <Input
                  type="number"
                  value={monto}
                  onChange={handleChangesetmonto}
                />
              </div>
            </div>

            <div className="flex flex-col mt-4 ">
              <Button_forms onClick={resetModal}>ELEGIR OTRO</Button_forms>
            </div>

            <div className="flex flex-col mt-4">
              <Button_forms type="submit">GUARDAR</Button_forms>
            </div>
          </div>
        </form>

        {state.gastos.length > 0 && (
          <div className="grid grid-cols-3 grid-rows-1 gap-40 mt-4">

            <div>
              <ul>
                {state.gastos.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                  >
                    <div className="flex flex-col">
                      <p className="font-bold text-gray-400">
                        {item.tipoGasto}
                      </p>
                      <p className="font-bold text-sm text-gray-400">
                        {item.subtipoGasto}
                      </p>
                      <p className="font-bold text-xs text-gray-400">
                        {item.tipoPago}
                      </p>
                      <p className="font-bold mt-1">Monto: ${item.monto}</p>
                    </div>
                    {
                      item.expense_id? (
                        <button
                          onClick={() => handleDeleteBD(item.expense_id as string, index)}
                          className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8 flex justify-center items-center"
                        >
                          X
                        </button>

                      ) : (
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8 flex justify-center items-center"
                        >
                          X
                        </button>
                      )
                    }
                  </li>
                ))}
              </ul>
            </div>

           
          </div>
        )}
    </div>
  )
}

export default FormGastosDashboard