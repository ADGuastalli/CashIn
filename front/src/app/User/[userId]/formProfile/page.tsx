'use client'
import React from 'react'

import FormProfile from '@/components/FormProfile'
import image_1 from '@/public/assets/imagen 1.png'
import Image from 'next/image'
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { UserContext } from '@/context/userContext';

function Profile() { 
  const { isAuthenticated , user} = useContext(UserContext)
  

  if (!isAuthenticated) return(<>
        { Swal.fire({
          title: "Deberias estar logueado",
          html: `
          Ir a  <b>Login</b>,
          <a href="/User/Login" autofocus>Acá</a>,
        `,
          confirmButtonAriaLabel: "Aceptar",
        })}

  </>)
  return (
    <section className=''>
      <div className='flex w-full items-center  '>
          <Image
            className='mr-10'
            src={image_1}
            width={200}
            height={200}
            alt='logo 2'
          />
        <h2>Necesitamos que completes el <span className='text-base'>Formulario</span> <br/> para una atencion mas personalizada</h2>
      </div>
        <FormProfile DataUser={user}/>
    </section>
  )
}

export default Profile