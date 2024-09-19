'use client'
import React from 'react'

import FormProfile from '@/components/FormProfile'
import image_1 from '@/public/assets/imagen 1.png'
import Image from 'next/image'
//import Swal from 'sweetalert2';
import { useContext } from 'react';
import { UserContext } from '@/context/userContext';

function Profile() { 
  const { userProfile } = useContext(UserContext)
  

  
  return (
    <section className='bg-white  '>
      <div className='flex flex-col md:flex-row justify-center w-full items-center  '>
          <Image
            className='mr-10'
            src={image_1}
            width={200}
            height={200}
            alt='logo 2'
          />
        <h2>Necesitamos que completes el <span className='text-base'>Formulario</span> <br/> para una atencion mas personalizada</h2>
      </div>
        <FormProfile DataUser={userProfile}/>
    </section>
  )
}

export default Profile