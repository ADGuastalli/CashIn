import React from 'react'
import BienestarFinaciero from './BienestarFinaciero'
import IndiceLiquidez from './IndiceLiquidez'
import DistribucionResponsabilidad from './Distribucionresponsabilidad'

interface GraficoDataProps {
} 

 const  Graficos: React.FC<GraficoDataProps> = () => {
  return (
    <div className='flex flex-col bg-white shadow-md  mt-6'>
        <h2 className='font-bold text-2xl md:pl-72 mt-4 '>Progreso de mis finanzas</h2>
        <div className='flex flex-col items-center md:pl-64 md:flex-row md:justify-around
       md:items-center w-screen h-auto'>
          <BienestarFinaciero/>
          <DistribucionResponsabilidad/>
          <IndiceLiquidez/>
        </div>
    </div>
  )
}

export default Graficos