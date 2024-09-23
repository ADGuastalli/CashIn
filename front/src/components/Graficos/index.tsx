import React from 'react'
import BienestarFinaciero from './BienestarFinaciero'
import IndiceLiquidez from './IndiceLiquidez'
import DistribucionResponsabilidad from './Distribucionresponsabilidad'

function Graficos() {
  return (
    <div className='flex flex-col md:flex-row md:justify-around
       md:items-center w-screen h-auto  py-6 mt-6 md:pl-64  bg-white shadow-md'>
        <BienestarFinaciero/>
        <DistribucionResponsabilidad/>
        <IndiceLiquidez/>
    </div>
  )
}

export default Graficos