'use client'
import React, { useState } from 'react'
import DrawerNav from '@/components/DrawerNav'
import HeaderProfile from '@/components/HeaderProfile'
import MenuFormsActions from '@/components/MenuFormsActions'
import MisMetas from '@/components/MisMetas'
import MenuFunctions from '@/components/MenuFunctions'
import { useContext } from 'react'
import { UserContext } from '@/context/userContext'

function PresupuestoRegistro() {
  const {user} = useContext(UserContext)
  
  const [visiblegastos, setVisibleGastos] = useState(false)
  
  return (
    <div>
        <DrawerNav/>
        <HeaderProfile user={user}/>
        <MenuFunctions setForm={setVisibleGastos} visible={visiblegastos}/>
        <MenuFormsActions visible={visiblegastos}/>
        <MisMetas metas=""/>
    </div>
  )
}

export default PresupuestoRegistro

