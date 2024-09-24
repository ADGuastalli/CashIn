import Logo from "../public/assets/svg/CASHIN-03.svg";
import Imagen2 from "../public/assets/imagen2.png";
import Image from "next/image";
import Navbar from "@/components/Nadvar";
import BooksComponet from "@/components/Books";
import CursosComponet from "@/components/Cursos";
import Button_Paypal from "@/components/Paypal";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center my-10">
        <Image
          src={Logo}
          alt="Logo"
          width={300}
          height={300}
          className="mb-5"
        />
        <Image
          src={Imagen2}
          alt="Logo2"
          width={600}
          height={600}
          className="mb-10"
        />
        <h1 className="text-5xl max-w-4xl mx-auto">
          Somos la <span className="font-bold">Herramienta</span> que te{" "}
          <span className="font-bold">Ayudará</span> a manejar tu dinero de
          manera <span className="font-bold">Inteligente</span>.
        </h1>
      </div>
      <div className=" bg-[#0095a919] p-20 mx-40 rounded-3xl">
        <h2 id="Producto" className="text-3xl mb-10 font-bold text-left">
          Conoce nuestra serie de Libros de Educación Financiera
        </h2>
        <div className="mb-10">
          <BooksComponet />
        </div>
        <h2 id="Educacion" className="text-3xl mb-10 font-bold mt-20">
          Cursos y Talleres
        </h2>
        <div>
          <CursosComponet />
        </div>
        <Button_Paypal />
      </div>
    </div>
  );
}
