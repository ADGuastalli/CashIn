import Logo from "../public/assets/image-removebg-preview.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center mx-5">
        <Image src={Logo} alt="Logo" width={601} height={601} />
        <h1 className="text-5xl mt-4 max-w-4xl mx-auto">
          Somos la <span className="font-bold">Herramienta</span> que te{" "}
          <span className="font-bold">Ayudará</span> a manejar tu dinero de
          manera <span className="font-bold">Inteligente</span>.
        </h1>
        <div className="flex gap-10 mt-10">
          <Link href="/User/Register">
            <button className="button-principal px-20 py-8">REGISTRO</button>
          </Link>
          <Link href="/User/Login">
            <button className="button-principal px-20 py-8">
              INICIAR SESIÓN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
