"use client";
import React from "react";
import FormProfile from "@/components/FormProfile";
import image_1 from "@/public/assets/imagen 1.png";
import Image from "next/image";
//import Swal from 'sweetalert2';
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

function Profile() {
  const { userProfile } = useContext(UserContext);

  return (
    <section className="bg-white">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image
          className="mr-10"
          src={image_1}
          width={300}
          height={300}
          alt="logo 2"
        />
        <div className="text-center mt-5">
          <h2 className="text-2xl mt-6">
            Necesitamos que completes el{" "}
            <span className="font-black">Formulario</span> <br /> para una
            atencion mas personalizada.
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center mt-5">
          <FormProfile DataUser={userProfile} />
        </div>
      </div>
    </section>
  );
}

export default Profile;
