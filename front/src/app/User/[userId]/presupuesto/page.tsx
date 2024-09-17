'use client'
import React from 'react'
import DrawerNav from '@/components/DrawerNav'
import HeaderProfile from '@/components/HeaderProfile'
import MenuFormsActions from '@/components/MenuFormsActions'
import MisMetas from '@/components/MisMetas'
import { useContext } from 'react'
import { UserContext } from '@/context/userContext'

function PresupuestoRegistro() {
  const {user} = useContext(UserContext)
  //usecontext user , gastos
  return (
    <div>
        <DrawerNav/>
        <HeaderProfile user={user}/>
        <MenuFormsActions/>
        <MisMetas metas=""/>
    </div>
  )
}

export default PresupuestoRegistro

