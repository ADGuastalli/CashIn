import React, { Dispatch, SetStateAction } from 'react'
import CardFunction from '../ui/cardFunction';
import ImgBolsa from "../../public/assets/svg/tax.svg";

interface PropsMenuFunction {
  setForm: Dispatch<SetStateAction<boolean>>,
  visible: boolean
}
const  MenuFunctions: React.FC<PropsMenuFunction> = ({setForm , visible}) => {

  return (
    <div className='flex  md:flex-row  w-screen h-auto px-4 py-4 mt-6 md:pl-72 md:mr-4 bg-white shadow-md'>
        <CardFunction imagen={ImgBolsa} text='gastos' setForm={setForm} visible={visible}/>
    </div>
  )
}

export default MenuFunctions