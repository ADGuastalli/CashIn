import Logo from "../public/assets/svg/CASHIN-03.svg";
import Imagen2 from "../public/assets/imagen2.png";
import Image from "next/image";
import Navbar from "@/components/Nadvar";
import BooksComponet from "@/components/Books";
import CursosComponet from "@/components/Cursos";
import ChatIALanding from "@/components/ChatIA";

export default function Home() {
  return (
    <div className="mb-20">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center my-20 px-4">
        <Image
          src={Logo}
          alt="Logo"
          width={300}
          height={300}
          className="mb-5 w-[80%] sm:w-[300px]" // Responsive adjustments
        />
        <Image
          src={Imagen2}
          alt="Logo2"
          width={600}
          height={600}
          className="mb-10 w-[90%] sm:w-[600px]" // Responsive adjustments
        />
        <h1 className="text-3xl sm:text-5xl max-w-4xl mx-auto px-4">
          Somos la <span className="font-bold">Herramienta</span> que te{" "}
          <span className="font-bold">Ayudará</span> a manejar tu dinero de
          manera <span className="font-bold">Inteligente</span>.
        </h1>
      </div>
      <div className=" sm:p-5 lg:p-10 mx-4 sm:mx-20 lg:mx-40 mb-20">
        <ChatIALanding />
      </div>
      <div className="bg-[#0095a919] p-6 sm:p-10 lg:p-20 mx-4 sm:mx-20 lg:mx-40 rounded-3xl mb-20">
        <h2
          id="Educacion"
          className="text-2xl sm:text-3xl mb-6 sm:mb-10 font-bold"
        >
          Cursos y Talleres
        </h2>
        <div>
          <CursosComponet />
        </div>
      </div>
      <div className="bg-[#0095a919] p-6 sm:p-10 lg:p-20 mx-4 sm:mx-20 lg:mx-40 rounded-3xl ">
        <h2
          id="Producto"
          className="text-2xl sm:text-3xl mb-6 sm:mb-10 font-bold text-left"
        >
          Conoce nuestra serie de Libros de Educación Financiera
        </h2>
        <div>
          <BooksComponet />
        </div>
      </div>
    </div>
  );
}
