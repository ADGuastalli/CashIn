"use client";
import React, { useState, useEffect, useContext } from "react";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import {
  Button_Menu,
  Button_forms,
  Button_actions_rounded,
} from "../ui/Buttons";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/Input";
import Swal from "sweetalert2";
import { Income } from "@/interface/interfaceData";
import { useIngresos } from "@/context/incomeContext";
import { UserContext } from "@/context/userContext";
import { useParams, useRouter } from "next/navigation";
import { postIncome, deleteIngreso } from "@/server/fetchIncome";
import { useCategories } from "@/context/categorias&variablesContext";


export default function IngresoFinanzasMetaComponet() {
  const { isAuthenticated } = useContext(UserContext);
  const router = useRouter();
  const {state , dispatch} = useIngresos()
  const [loading, setLoading] = useState(true);
  const [sueldo, setSueldo] = useState("");
  const [monto, setMonto] = useState("");
  const [descriptIngreso, setDescriptIngrso] = useState<string>()
  const { income_category } = useCategories();

  const fecha = new Date();

  const { userId } = useParams();

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Para ingresar debes estar logueado.",
        icon: "warning",
        confirmButtonText: "Ir a Login",
        allowOutsideClick: false,
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/User/Login");
        }
      });
    }
  }, [loading, isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (sueldo && monto && descriptIngreso) {
      const newIngreso: Income = {
          income_category: sueldo, 
          income: descriptIngreso, 
          mount: +monto, 
          date: fecha.toLocaleDateString(),
      }
      postIncome(newIngreso, userId as string)

      dispatch({
        type: "ADD_INGRESO",
        payload:{
          tipoIngreso: sueldo,
          monto:monto,
          descripcionIngreso: descriptIngreso,
        }
      })
      setDescriptIngrso("")
      setSueldo("");
      setMonto("");
    }
  };

  const handleDelete = (index: number, income_id: string | undefined) => {
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
        dispatch({
          type: "DELETE_INGRESO",
          payload: index
        })
        if(income_id){
          deleteIngreso(income_id)
        }
        Swal.fire("¡Eliminado!", "El ingreso ha sido eliminado.", "success");
      }
    });
  };

  // Calcular el total de las deudas
  const totalDeuda = state.ingresos.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
  );

  if (loading) {
    return null; // Aquí puedes mostrar un spinner si lo deseas
  }

  return (
    <div>
      <div>
        <Link href="/Menu">
          <Button_Menu />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image src={Logo} alt="Logo" width={300} height={300} />
        <div className="text-center mt-5">
          <h1 className="text-2xl mt-6 font-black">
            Conozcamos un poco de tus
          </h1>
          <h2 className="text-xl mt-1">Finanzas personales.</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex flex-col mt-5">
                <label className="text-lg font-bold">Tipo de Ingreso</label>
                <select
                  className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
                  border-gray-300 rounded-lg py-4 px-4 mx-2 my-2 block w-96 appearance-none leading-normal
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  value={sueldo}
                  onChange={(e) => setSueldo(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  {
                  income_category.map((income, index)=>{
                    return(
                      <option value={income} key={index}>{income}</option>
                    )
                  })
                 }
                </select>
              </div>

              <div className="flex flex-col">
                <div className="relative">
                  <Input
                    type="text"
                    value={descriptIngreso}
                    onChange={(e) => setDescriptIngrso(e.target.value)}
                  />
                </div>
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
              Total Deudas: ${totalDeuda.toFixed(2)}
            </h3>
          </div>

          {state.ingresos.length > 0 && (
            <div className="grid grid-cols-3 grid-rows-1 gap-40">
              <div className="flex flex-col items-center">
                <Link href="/Menu/Ahorrar">
                  <Button_actions_rounded>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-[#C38A01]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </Button_actions_rounded>
                </Link>
                <p className="font-black text-xl text-[#FAB100]">Atras</p>
              </div>

              <div>
                <ul>
                  {state.ingresos.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-4 rounded-lg mb-3 shadow w-96"
                    >
                      <div className="flex flex-col mr-20">
                        <p className="font-bold text-gray-400">
                          {item.tipoIngreso}
                        </p>
                        <p className="font-bold text-xs text-gray-400">
                          {item.descripcionIngreso}
                        </p>
                        <p className="font-bold">Monto: ${item.monto}</p>
                      </div>
                      <button
                        className="bg-red-400 text-black font-black text-sm hover:bg-red-500/80 p-2 rounded-full h-8 w-8 flex justify-center items-center"
                        onClick={() => handleDelete(index, item.income_id)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <Link href="/Menu/Ahorrar/Finanzas/MontoMeta">
                  <Button_actions_rounded>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-[#C38A01]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button_actions_rounded>
                </Link>
                <p className="font-black text-xl text-[#FAB100]">Analizar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
