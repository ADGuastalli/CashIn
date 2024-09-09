import Logo from "../public/assets/image-removebg-preview.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={Logo} alt="Logo" width={800} height={800} />
      <button className="button-principal">INGRESAR</button>
    </div>
  );
}
