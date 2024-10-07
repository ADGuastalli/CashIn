'use client'
import React, { useState } from 'react'
import DrawerNav from '@/components/DrawerNav'
import HeaderProfile from '@/components/HeaderProfile'
import MenuFormsActions from '@/components/MenuFormsActions'
import MisMetas from '@/components/MisMetas'
import MenuFunctions from '@/components/MenuFunctions'
import { useContext } from 'react'
import { UserContext } from '@/context/userContext'
import { useTotalMes } from '@/context/TotalesMes'
import Graficos from '@/components/Graficos'
import ProgresoDeTusFinanzas from '@/components/ProgresoDeTusFinanzas'

function PresupuestoRegistro() {
  const {userProfile} = useContext(UserContext)
  const { totalExpense,totalIncomes,totalSaving } = useTotalMes();
  const [visiblegastos, setVisibleGastos] = useState(false)
  const [visibleIngresos, setVisibleIngresos] = useState(false)
  const [visibleMetas, setVisibleMetas] = useState(false)
  const [visibleBienes, setVisibleBienes] = useState(false)
  const [visibleDeudas, setVisibleDeudas] = useState(false)
  
  

  return (
    <div>
        <DrawerNav/>
        <HeaderProfile user={userProfile}/>
        <MenuFunctions setForm={[setVisibleGastos,setVisibleIngresos,setVisibleMetas,setVisibleBienes,setVisibleDeudas]} 
                       visible={[visiblegastos,visibleIngresos,visibleMetas,visibleBienes,visibleDeudas]}/>
        <MenuFormsActions visible={[visiblegastos,visibleIngresos,visibleMetas,visibleBienes,visibleDeudas]}
          totalGastos={totalExpense}
          totalIngresos={totalIncomes}
          totalAhorros={totalSaving}/>
        <MisMetas visible={visibleMetas}/>
        <ProgresoDeTusFinanzas/>
        <Graficos /> {/* deberia recibir un objeto con totdos los totales mensuales de cada total */}
    </div>
  )
}

export default PresupuestoRegistro

