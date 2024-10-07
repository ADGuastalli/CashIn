"use client";
import React, {  useState, useEffect} from "react";
//import { UserContext } from "../../context/userContext";
import {
  Button_forms,
  Button_action
} from "../ui/Buttons";
import { Input } from "../ui/Input";
import { useTotalMes } from "@/context/TotalesMes";
import { calculaTiempoPredeterminado } from "@/helpers/calculaTiempoDeMeta";
import { Meta } from "@/interface/interfaceData";
import { postMeta } from "@/server/fetchMetas";

interface propsMetas {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
}
export default function MetaFromDashboard({setModalVisible,userId}: propsMetas) {
  const { totalIncomes } = useTotalMes();
  const [Valor, setValor] = useState("");
  const [monto, setMonto] = useState("");
  const [tiempoEstimado,SetTiempoEstimado] = useState("");
  const [porcentageAhorro,setProcentageAhorro] = useState("");
  const [aceptarPredeterminados, setAceptarPredeterminados] = useState(false);
  const [tiempoRecomendado, setTiempoRecomendado] = useState(0)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Valor && monto && tiempoEstimado && porcentageAhorro) {
      const newMeta: Meta = { 
        goal: Valor, 
        mount: monto, 
        time_months: tiempoEstimado, 
        percentage: porcentageAhorro };

        postMeta(newMeta,userId)
        
        SetTiempoEstimado("");
        setProcentageAhorro("");
        setValor("");
        setMonto("");
        setModalVisible(false);
    
    }
  };

  useEffect(() => {
    const Meses = calculaTiempoPredeterminado(parseInt(monto),totalIncomes,parseInt(porcentageAhorro));
    setTiempoRecomendado(Meses)
  },[monto,totalIncomes,porcentageAhorro])

  const aplicaParametros = () => {
    setAceptarPredeterminados(true);

  }

  const cancelarForm = () => {
    setProcentageAhorro("");
    SetTiempoEstimado("");
    setMonto("");
    setValor("");
    setModalVisible(false);
  }

  return (
   <div className="fixed md:pl-64 z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex flex-col mt-5">
                <label className="text-lg font-bold">Nombre de la memta / articulo o bien</label>
                <div className="relative">
                  <Input
                    type="text"
                    value={Valor}
                    onChange={(e) => setValor(e.target.value)}
                  />
                </div>    
              </div>

              <div className="flex flex-col">
                  <label className="text-lg font-bold">Valor en RD$</label>
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

              <div className="flex flex-col">
                <div className="relative">
                  <label className="text-lg font-bold">Tiempo estimado</label>
                  <Input
                    type="text"
                    value={tiempoEstimado}
                    onChange={(e) => SetTiempoEstimado(e.target.value)}
                  />
                </div>
                {(!aceptarPredeterminados && porcentageAhorro != '') && (<p>Te recomendamos un tiempo de {tiempoRecomendado}</p>) }

              </div>

              <div className="flex flex-col">
                  <label className="text-lg font-bold">¿Cuanto deseas ahorrar?</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 pl-3 flex  items-center font-black">
                    %
                  </span>
                  <Input
                    type="number"
                    value={porcentageAhorro}
                    onChange={(e) => setProcentageAhorro(e.target.value)}
                  />
                </div>
                {!aceptarPredeterminados && (<p>Te recomendamos un 10% de tus ingresos</p>) }
              </div>
              {
                (porcentageAhorro != '10' && aceptarPredeterminados) && (
                    <div className="">
                      <div>
                        <span>aler</span>
                        <p>¿Deseas aplicar los parametros que te recomendamos?</p>
                      </div>
                      <button onClick={aplicaParametros}>Aplicar</button>
                    </div>)
              }
              <div className="flex flex-col mt-10">
                <Button_forms onClick={cancelarForm}>CANCELAR</Button_forms>
              </div>
              <div className="flex flex-col mt-10">
                <Button_action type="submit" >ACEPTAR</Button_action>
              </div>
            </div>
          </form>
         
          
   </div>
  );
}
