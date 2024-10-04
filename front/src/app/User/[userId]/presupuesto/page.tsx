'use client'
import React, { useState } from 'react'
import DrawerNav from '@/components/DrawerNav'
import HeaderProfile from '@/components/HeaderProfile'
import MenuFormsActions from '@/components/MenuFormsActions'
import MisMetas from '@/components/MisMetas'
import MenuFunctions from '@/components/MenuFunctions'
import { useContext } from 'react'
import { UserContext } from '@/context/userContext'
import { useGastos } from '@/context/gastosContext'
import Graficos from '@/components/Graficos'

function PresupuestoRegistro() {
  const {userProfile} = useContext(UserContext)
  const {state} = useGastos();

  const [visiblegastos, setVisibleGastos] = useState(false)
  const [visibleIngresos, setVisibleIngresos] = useState(false)
  const [visibleMetas, setVisibleMetas] = useState(false)
  const [visibleBienes, setVisibleBienes] = useState(false)
  const [visibleDeudas, setVisibleDeudas] = useState(false)
  
  
  const totalGastos = state.gastos.reduce(
    (acc, item) => acc + parseFloat(item.monto),
    0
  );
  return (
    <div>
        <DrawerNav/>
        <HeaderProfile user={userProfile}/>
        <MenuFunctions setForm={[setVisibleGastos,setVisibleIngresos,setVisibleMetas,setVisibleBienes,setVisibleDeudas]} 
                       visible={[visiblegastos,visibleIngresos,visibleMetas,visibleBienes,visibleDeudas]}/>
        <MenuFormsActions visible={[visiblegastos,visibleIngresos,visibleMetas,visibleBienes,visibleDeudas]}
          totalGastos={`${totalGastos}`}/>
        <MisMetas visible={visibleMetas}/>
        <Graficos/>
    </div>
  )
}

export default PresupuestoRegistro

