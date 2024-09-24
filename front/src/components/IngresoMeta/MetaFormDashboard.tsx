"use client";
import React, {  useState } from "react";
//import { UserContext } from "../../context/userContext";
import {
  Button_forms,
} from "../ui/Buttons";
import { Input } from "../ui/Input";

type Meta = {
    tipoValor: string;
    monto: string;
    tiempoEstimado: string;
    porcentageAhorro: string;
  };
  

interface propsMetas {
    misMetas: React.Dispatch<React.SetStateAction<Meta[]>>;
}
export default function MetaFromDashboard({misMetas}: propsMetas) {
  //const { user } = useContext(UserContext);
  const [Valor, setValor] = useState("");
  const [monto, setMonto] = useState("");
  const [tiempoEstimado,SetTiempoEstimado] = useState("");
  const [porcentageAhorro,setProcentageAhorro] = useState("");
  const [Valors, setValors] = useState<Meta[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Valor && monto && tiempoEstimado && porcentageAhorro) {
      setValors([...Valors, { tipoValor: Valor, monto , tiempoEstimado , porcentageAhorro}]);
      const newMeta: Meta = { tipoValor: Valor, monto, tiempoEstimado, porcentageAhorro };
      
      misMetas((prev: Meta[]) => [...prev, newMeta])
      setValor("");
      setMonto("");
    }
  };


  return (
   <div>
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
              </div>

              <div className="flex flex-col mt-10">
                <Button_forms type="submit">GUARDAR</Button_forms>
              </div>
            </div>
          </form>
         
          
   </div>
  );
}
