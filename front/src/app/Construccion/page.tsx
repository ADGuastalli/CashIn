import React from "react";
import Image from "next/image";
import { Button_Home } from "@/components/ui/Buttons";
import Link from "next/link";

export default function PageConstruccion() {
  return (
    <div>
      <Link href="/">
        <Button_Home />
      </Link>
      <div className="flex justify-center items-center h-screen">
        <Image
          src="https://i.postimg.cc/SNxWpdKp/pagina-en-construccion2.png"
          alt="pagina-en-construccion2"
          width={1000}
          height={500}
        />
      </div>
    </div>
  );
}
