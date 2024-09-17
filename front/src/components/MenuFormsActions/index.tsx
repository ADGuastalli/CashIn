import React from 'react'
import Card_presupuesto from '../ui/Cards'

function MenuFormsActions() {
  return (
    <div className='flex  md:flex-row  w-screen h-auto px-4 py-4 mt-6 md:pl-72 md:mr-4 bg-white shadow-md'>
        <div className='md:mr-4'>
          <Card_presupuesto option='ahorro' money='00.10'/>  
        </div>
        <div className='md:mr-4'>
          <Card_presupuesto option='ingresos' money='00.10'/>  
        </div>
        <div className='md:mr-4'>
          <Card_presupuesto option='gastos' money='00.10'/>  
        </div>
    </div>
  )
}

export default MenuFormsActions