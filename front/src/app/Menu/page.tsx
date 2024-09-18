"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/svg/CASHIN-03.svg";
import MenuIcons from "@/components/Menu";
import { Button_Home } from "@/components/ui/Buttons";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";

export default function Menu() {
  const { isProfileComplete, user } = useContext(UserContext);

  useEffect(() => {
    console.log("User en Menu", user);
  }, [user]);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (!user || !user.id) {
    return <div>Loading...</div>;
  }

  const profileUrl = `/User/${user.id}/formProfile`;

  return (
    <div>
      <div>
        <Link href="/">
          <Button_Home />
        </Link>
      </div>
      {!isProfileComplete && (
        <div className="mt-6 text-center bg-black">
          <p className="text-lg mb-4">Tu perfil aún no está completo.</p>
          <Link href={profileUrl} className="btn btn-primary">
            Completa tu perfil
          </Link>
        </div>
      )}
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
          className="mt-2"
        />

        <h1 className="text-3xl mt-6 mb-4">
          ¿Qué deseas hacer con nuestra app{" "}
          <span className="font-bold">{user.email}</span>?
        </h1>
        <MenuIcons />
      </div>
    </div>
  );
}
