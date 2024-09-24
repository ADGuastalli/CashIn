import React from 'react'
import Image from "next/image";

interface PropsFunctions {
    imagen: string,
    text: string,
    setForm:React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean
}
const CardFunction: React.FC<PropsFunctions> = ({imagen , text, setForm , visible}) => {
  return (
    <div className="flex flex-col items-center" onClick={()=>setForm(!visible)}>
    <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-12 h-12 transition-all duration-500">
      <Image
        src={imagen}
        alt="Poder pagar mis deudas"
        width={20}
        height={20}
      />
    </div>
    <p className="mt-2 text-sm font-bold">{text}</p>
  </div>
  )
}

export default CardFunction