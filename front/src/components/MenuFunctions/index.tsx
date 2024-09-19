import React, { Dispatch, SetStateAction } from 'react'
import CardFunction from '../ui/cardFunction';
import ImgBolsa from "../../public/assets/svg/tax.svg";
import ImgTrans from "../../public/assets/svg/transfer.svg";
import ImgAhorro from "../../public/assets/svg/piggy-bank.svg";
import ImgPresu from "../../public/assets/svg/budget.svg";
interface PropsMenuFunction {
  setForm: Dispatch<SetStateAction<boolean>>[],
  visible: boolean[]
}
const  MenuFunctions: React.FC<PropsMenuFunction> = ({setForm , visible}) => {

  return (
    <div className='flex justify-around md:flex-row  w-screen h-auto px-4 py-4 mt-6 md:pl-72 md:mr-4 bg-white shadow-md'>
        <CardFunction imagen={ImgTrans} text='gastos' setForm={setForm} visible={visible} aux={0}/>
        <CardFunction imagen={ImgTrans} text='ingresos' setForm={setForm} visible={visible} aux={1}/>
        <CardFunction imagen={ImgAhorro} text='Metas' setForm={setForm} visible={visible} aux={2}/>
        <CardFunction imagen={ImgPresu} text='Bienes' setForm={setForm} visible={visible} aux={3}/>
        <CardFunction imagen={ImgBolsa} text='Deudas' setForm={setForm} visible={visible} aux={4}/>
    </div>
  )
}

export default MenuFunctions