import Logo from "../public/assets/svg/CASHIN-03.svg";
import Imagen2 from "../public/assets/imagen2.png";
import Image from "next/image";
import Navbar from "@/components/Nadvar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center my-10">
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
      </div>
    </div>
  );
}
