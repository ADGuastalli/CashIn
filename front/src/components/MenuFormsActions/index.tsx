import React from 'react'
import Card_presupuesto from '../ui/Cards'
import FormGastosDashboard from '../Gastos/indexFormGastosDashboard'
import SueldoFromDashboard from '../IngresoSueldo/SueldoFormdashboard'
import BienesFormDashboard from '../Diagnostico/bienesFormDashboard'
import DeudasFormDashboard from '../Diagnostico/deudasFormDashboard'

function MenuFormsActions({visible} : {visible:boolean[]}) {
  return (
    <div className='flex flex-col  w-screen h-auto  py-4 mt-6 md:pl-72  bg-white shadow-md'>
        <div className='flex justify-around w-full h-auto'>
          <Card_presupuesto option='ahorro' money='00.10'/>  
          <Card_presupuesto option='ingresos' money='00.10'/>  
          <Card_presupuesto option='gastos' money='00.10'/>  
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