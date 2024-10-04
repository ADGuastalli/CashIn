import React, { useState } from "react";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import Image from "next/image";
import ImgBolsa from "../../public/assets/svg/tax.svg";
import ImgTrans from "../../public/assets/svg/transfer.svg";
import ImgCard from "../../public/assets/svg/surface1.svg";
import ImgAhorro from "../../public/assets/svg/piggy-bank.svg";
import ImgDiag from "../../public/assets/svg/review.svg";
import ImgPresu from "../../public/assets/svg/budget.svg";
import ImgUser from "../../public/assets/svg/user-circle-svgrepo-com.svg";
import ImgChat from "../../public/assets/svg/chatIA.png";
import ImagAdmin from "../../public/assets/svg/user-people-svgrepo-com.svg";
import ModalFormComplete from "@/components/ModalFormComplet";
import { hasNullProperties } from "@/helpers/hasNullProperties";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MenuIcons() {
  const { userProfile } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  console.log("userProfileeeeee", userProfile);

  const userId = userProfile?.user_id;
  const handleClick = (path: string) => {
    if (hasNullProperties(userProfile)) {
      setShowModal(true); // Mostrar modal si el perfil no está completo
    } else {
      router.push(path); // Establece la ruta si el perfil está completo
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Función para cerrar el modal
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center w-full max-w-4xl mt-10">
        {showModal && (
          <ModalFormComplete
            router={router} // Pasamos el router para la navegación
            user_id={userId}
            onClose={handleCloseModal}
          />
        )}

        <div
          className="flex flex-col items-center"
          onClick={() => handleClick("/Menu/PagarMisDeudas")}
        >
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image
              src={ImgBolsa}
              alt="Poder pagar mis deudas"
              width={60}
              height={60}
            />
          </div>
          <p className="mt-2 text-lg font-bold">Poder pagar mis deudas</p>
        </div>

        <div
          className="flex flex-col items-center"
          onClick={() => handleClick("/Menu/ControlarMisGastos")}
        >
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image
              src={ImgTrans}
              alt="Controlar Mis gastos"
              width={60}
              height={60}
            />
          </div>
          <p className="mt-2 text-lg font-bold">Controlar Mis gastos</p>
        </div>

        <div
          className="flex flex-col items-center"
          onClick={() =>
            handleClick("https://chatgpt.com/g/g-R6OiPvkkm-cashinbot")
          }
        >
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image src={ImgChat} alt="Chat" width={90} height={90} />
          </div>
          <p className="mt-2 text-lg font-bold">CashInBOT</p>
        </div>

        <div
          className="flex flex-col items-center"
          onClick={() => handleClick(`/User/${userId}/presupuesto`)}
        >
          <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
            <Image src={ImgUser} alt="Mi perfil" width={60} height={60} />
          </div>
          <p className="mt-2 text-lg font-bold">Mi perfil</p>
        </div>

        {userProfile.premium === false && userProfile.admin === false ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-300 hover:bg-yellow-200 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
              <Image src={ImgCard} alt="Lograr metas" width={60} height={60} />
            </div>
            <p className="text-xl font-bold">Premium</p>
            <p className="mt-1 text-lg font-bold">
              Lograr metas <br />
              <span className="font-medium">(Carro, Casa, Estufa)</span>
            </p>
          </div>
        ) : (
          <div
            className="flex flex-col items-center"
            onClick={() => handleClick("/Menu/Metas")}
          >
            <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
              <Image src={ImgCard} alt="Lograr metas" width={60} height={60} />
            </div>

            <p className="mt-2 text-lg font-bold">
              Lograr metas <br />
              <span className="font-medium">(Carro, Casa, Estufa)</span>
            </p>
          </div>
        )}

        {userProfile.premium === false && userProfile.admin === false ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-300 hover:bg-yellow-200 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
              <Image
                src={ImgAhorro}
                alt="Lograr metas"
                width={60}
                height={60}
              />
            </div>
            <p className=" text-lg font-bold">Premium</p>
            <p className="mt-1 text-lg font-bold">Ahorrar</p>
          </div>
        ) : (
          <div
            className="flex flex-col items-center"
            onClick={() => handleClick("/Menu/Ahorrar")}
          >
            <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
              <Image src={ImgAhorro} alt="Ahorrar" width={60} height={60} />
            </div>

            <p className="mt-2 text-lg font-bold">Ahorrar</p>
          </div>
        )}

        {userProfile.premium === false && userProfile.admin === false ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-300 hover:bg-yellow-200 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
              <Image src={ImgPresu} alt="Presupuesto" width={60} height={60} />
            </div>
            <p className=" text-lg font-bold">Premium</p>
            <p className="mt-1 text-lg font-bold">Presupuesto</p>
          </div>
        ) : (
          <div
            className="flex flex-col items-center"
            onClick={() => handleClick("#")}
          >
            <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
              <Image src={ImgPresu} alt="Presupuesto" width={60} height={60} />
            </div>

            <p className="mt-2 text-lg font-bold">Presupuesto</p>
          </div>
        )}

        {userProfile.premium === false && userProfile.admin === false ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-300 hover:bg-yellow-200 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
              <Image src={ImgDiag} alt="Diagnostico" width={60} height={60} />
            </div>
            <p className=" text-lg font-bold">Premium</p>
            <p className="mt-1 text-lg font-bold">
              Diagnostico <br />
              <span className="font-medium">(Diagnostico de mis finanzas)</span>
            </p>
          </div>
        ) : (
          <div
            className="flex flex-col items-center"
            onClick={() => handleClick("/Menu/Diagnostico")}
          >
            <div className="flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
              <Image src={ImgDiag} alt="Diagnostico" width={60} height={60} />
            </div>

            <p className="mt-2 text-lg font-bold">
              Diagnostico <br />
              <span className="font-medium">(Diagnostico de mis finanzas)</span>
            </p>
          </div>
        )}
      </div>
      {userProfile.admin === true ? (
        <div className="flex flex-col items-center">
          <Link href="/Menu/Admin">
            <div className="flex flex-col items-center justify-center p-4 bg-yellow-200 hover:bg-yellow-300 rounded-lg shadow-md w-40 h-40 transition-all duration-500">
              <Image src={ImagAdmin} alt="Admin" width={60} height={60} />
            </div>
          </Link>
          <p className="mt-1 text-lg font-bold">Administrador/a</p>
        </div>
      ) : null}
    </div>
  );
}
