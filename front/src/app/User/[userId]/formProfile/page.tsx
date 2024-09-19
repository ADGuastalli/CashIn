"use client";
import React from "react";
import FormProfile from "@/components/FormProfile";
import image_1 from "@/public/assets/imagen 1.png";
import Image from "next/image";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { Button_Menu } from "@/components/ui/Buttons";
import Link from "next/link";

<<<<<<< HEAD
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
=======
function Profile() {
  const { isAuthenticated, user } = useContext(UserContext);

  if (!isAuthenticated)
    return (
      <>
        {Swal.fire({
          title: "Deberias estar logueado",
          html: `
          Ir a  <b>Login</b>,
          <a href="/User/Login" autofocus>Acá</a>,
        `,
          confirmButtonAriaLabel: "Aceptar",
        })}
      </>
    );
  return (
    <section className="bg-white">
      <div>
        <Link href="/Menu">
          <Button_Menu />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image
          className="mr-10"
          src={image_1}
          width={200}
          height={200}
          alt="logo 2"
        />
        <div className="text-center mt-5">
          <h2 className="text-2xl mt-6 ">
            Necesitamos que completes el{" "}
            <span className="font-black">Formulario</span> <br /> para una
            atencion mas personalizada.
          </h2>
        </div>
        <FormProfile DataUser={user} />
      </div>
>>>>>>> origin/Developer
    </section>
  );
}

export default Profile;
