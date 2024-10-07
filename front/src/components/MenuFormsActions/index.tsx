import React from 'react'
import Card_presupuesto from '../ui/Cards'
import FormGastosDashboard from '../Gastos/indexFormGastosDashboard'
import SueldoFromDashboard from '../IngresoSueldo/SueldoFormdashboard'
import BienesFormDashboard from '../Diagnostico/bienesFormDashboard'
import DeudasFormDashboard from '../Diagnostico/deudasFormDashboard'

interface MenuFormsActionsProps {
  visible: boolean[];
  totalGastos: number;
  totalIngresos: number;
  totalAhorros: number
} 
const MenuFormsActions: React.FC<MenuFormsActionsProps> = ({ visible, totalGastos, totalAhorros, totalIngresos }) => {
  return (
    <div className='flex flex-col  w-screen h-auto  py-4 mt-6 md:pl-72  bg-white shadow-md'>
        <div className='flex justify-around w-full h-auto'>
          <Card_presupuesto option='ahorro' money={totalGastos}/>  
          <Card_presupuesto option='ingresos' money={totalIngresos}/>  
          <Card_presupuesto option='gastos' money={totalAhorros}/>  
        </div>
        <div className=''>
        { visible[0] && (<div className=' h-auto' >
            <FormGastosDashboard/>
          </div>
          )}
        {
          visible[1] && (<div className=' h-auto' >
            <SueldoFromDashboard/>
          </div>)
        }  
        {
          visible[3] && (<div className='h-auto' >
            <BienesFormDashboard/>
          </div>)
        }
        {
          visible[4] && (<div className='h-auto' >
            <DeudasFormDashboard/>
          </div>)
        }
        </div>
    </div>
  )
}

export default MenuFormsActions