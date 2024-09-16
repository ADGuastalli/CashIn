'use client'
import React, { useEffect } from 'react'

import FormProfile from '@/components/FormProfile'
import { useRouter } from 'next/router'
import { useContext } from 'react';
import { UserContext } from '@/context/userContext';

function Profile() {
  const router = useRouter();
  const { isAuthenticated , user} = useContext(UserContext)
  
  useEffect(()=>{
    if(!isAuthenticated) router.push("/Login")
  },[isAuthenticated,router])

  return (
    <section className=''>
      <h2>Necesitamos que completes el <p>Formulario</p> para una atencion mas personalizada</h2>
        <FormProfile DataUser={user}/>
    </section>
  )
}

export default Profile