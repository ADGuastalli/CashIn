"use client";
import React, { useEffect } from "react";
import ImgBolsa from "../../public/assets/svg/tax.svg";
import ImgTrans from "../../public/assets/svg/transfer.svg";
import ImgCard from "../../public/assets/svg/surface1.svg";
import ImgAhorro from "../../public/assets/svg/piggy-bank.svg";
import ImgDiag from "../../public/assets/svg/review.svg";
import ImgPresu from "../../public/assets/svg/budget.svg";
import ImgChat from "../../public/assets/svg/chatIA.png";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import AOS from "aos";
import "aos/dist/aos.css";
import { Box, Typography } from "@mui/material";

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  backgroundColor: "background.paper",
  border: "2px solid #0095a9",
  borderRadius: "20px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  padding: 4,
};

export const ButtonLanding = () => {
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  const [open6, setOpen6] = React.useState(false);
  const handleOpen6 = () => setOpen6(true);
  const handleClose6 = () => setOpen6(false);

  const [open7, setOpen7] = React.useState(false);
  const handleOpen7 = () => setOpen7(true);
  const handleClose7 = () => setOpen7(false);

  useEffect(() => {
    AOS.init({
      duration: 500, // Duración de la animación (1000ms = 1s)
      once: true, // La animación solo sucede una vez al hacer scroll hacia abajo
    });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8" data-aos="fade-up">
      <div className="flex flex-col items-center">
        <div
          className="cursor-pointer flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500"
          onClick={handleOpen1}
        >
          <Image
            src={ImgBolsa}
            alt="Poder pagar mis deudas"
            width={60}
            height={60}
          />
        </div>
        <p className="mt-2 text-lg font-bold">Poder pagar mis deudas</p>
      </div>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title1"
        aria-describedby="modal-modal-description1"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title1"
            variant="h6"
            component="h2"
            className="font-bold text-[#0095a9] text-center"
          >
            Cómo poder pagar mis deudas
          </Typography>
          <Typography
            id="modal-modal-description1"
            className="text-center"
            sx={{ mt: 2 }}
          >
            Descubre estrategias efectivas para gestionar y saldar tus deudas.
            Al{" "}
            <a href="/User/Login" className="font-bold">
              iniciar sesión
            </a>
            , podrás acceder a herramientas personalizadas que te ayudarán a
            organizar tus pagos y reducir tus obligaciones financieras.
          </Typography>
        </Box>
      </Modal>

      <div className="flex flex-col items-center">
        <div
          className="cursor-pointer flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500"
          onClick={handleOpen2}
        >
          <Image
            src={ImgTrans}
            alt="Controlar Mis gastos"
            width={60}
            height={60}
          />
        </div>
        <p className="mt-2 text-lg font-bold">Controlar Mis gastos</p>
      </div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description2"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title2"
            variant="h6"
            component="h2"
            className="font-bold text-[#0095a9] text-center"
          >
            Cómo poder controlar mis gastos
          </Typography>
          <Typography
            id="modal-modal-description2"
            className="text-center"
            sx={{ mt: 2 }}
          >
            Aprende a monitorear y limitar tus gastos diarios para mantener un
            equilibrio financiero.
            <a href="/User/Login" className="font-bold">
              Inicia sesión
            </a>{" "}
            para recibir consejos y recomendaciones adaptadas a tu situación
            financiera específica.
          </Typography>
        </Box>
      </Modal>

      <div className="flex flex-col items-center">
        <div
          className="cursor-pointer flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500"
          onClick={handleOpen3}
        >
          <Image src={ImgCard} alt="Lograr metas" width={60} height={60} />
        </div>
        <p className="mt-2 text-lg font-bold">Lograr metas</p>
      </div>
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title3"
        aria-describedby="modal-modal-description3"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title3"
            variant="h6"
            component="h2"
            className="font-bold text-[#0095a9] text-center"
          >
            Cómo poder lograr metas
          </Typography>
          <Typography
            id="modal-modal-description3"
            className="text-center"
            sx={{ mt: 2 }}
          >
            Establece objetivos financieros alcanzables y planifica tus ahorros.
            Al{" "}
            <a href="/User/Login" className="font-bold">
              registrarte
            </a>
            , tendrás acceso a un planificador de metas que te ayudará a
            visualizar tu progreso.
          </Typography>
        </Box>
      </Modal>

      <div className="flex flex-col items-center">
        <div
          className="cursor-pointer flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500"
          onClick={handleOpen4}
        >
          <Image src={ImgAhorro} alt="Ahorrar" width={60} height={60} />
        </div>
        <p className="mt-2 text-lg font-bold">Ahorrar</p>
      </div>
      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title4"
        aria-describedby="modal-modal-description4"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title4"
            variant="h6"
            component="h2"
            className="font-bold text-[#0095a9] text-center"
          >
            Cómo poder ahorrar
          </Typography>
          <Typography
            id="modal-modal-description4"
            className="text-center"
            sx={{ mt: 2 }}
          >
            Encuentra métodos prácticos para aumentar tus ahorros y alcanzar tus
            metas.{" "}
            <a href="/User/Login" className="font-bold">
              Inicia sesión
            </a>{" "}
            para recibir tips personalizados y herramientas de seguimiento que
            faciliten tu camino al ahorro.
          </Typography>
        </Box>
      </Modal>

      <div className="flex flex-col items-center">
        <div
          className="cursor-pointer flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500"
          onClick={handleOpen5}
        >
          <Image
            src={ImgDiag}
            alt="Diagnóstico Financiero"
            width={60}
            height={60}
          />
        </div>
        <p className="mt-2 text-lg font-bold">Diagnóstico Financiero</p>
      </div>
      <Modal
        open={open5}
        onClose={handleClose5}
        aria-labelledby="modal-modal-title5"
        aria-describedby="modal-modal-description5"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title5"
            variant="h6"
            component="h2"
            className="font-bold text-[#0095a9] text-center"
          >
            Hacer un diagnóstico financiero completo
          </Typography>
          <Typography
            id="modal-modal-description5"
            className="text-center"
            sx={{ mt: 2 }}
          >
            Realiza un análisis exhaustivo de tu situación financiera actual. Al{" "}
            <a href="/User/Login" className="font-bold">
              registrarte
            </a>
            , podrás obtener un informe detallado que te brindará una visión
            clara de tus finanzas.
          </Typography>
        </Box>
      </Modal>

      <div className="flex flex-col items-center">
        <div
          className="cursor-pointer flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500"
          onClick={handleOpen6}
        >
          <Image src={ImgPresu} alt="Presupuesto" width={60} height={60} />
        </div>
        <p className="mt-2 text-lg font-bold">Balance de Mis Finanzas</p>
      </div>
      <Modal
        open={open6}
        onClose={handleClose6}
        aria-labelledby="modal-modal-title6"
        aria-describedby="modal-modal-description6"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title6"
            variant="h6"
            component="h2"
            className="font-bold text-[#0095a9] text-center"
          >
            Poder sacar un balance de mis finanzas
          </Typography>
          <Typography
            id="modal-modal-description6"
            className="text-center"
            sx={{ mt: 2 }}
          >
            Genera un balance financiero que te permita conocer tu situación
            actual. Al{" "}
            <a href="/User/Login" className="font-bold">
              iniciar sesión
            </a>
            , podrás acceder a gráficos y reportes que te ayudarán a entender
            mejor tus finanzas.
          </Typography>
        </Box>
      </Modal>

      <div className="flex flex-col items-center">
        <div
          className="cursor-pointer flex flex-col items-center justify-center p-4 hover:bg-[#0095A9]/15 rounded-lg shadow-md w-40 h-40 transition-all duration-500"
          onClick={handleOpen7}
        >
          <Image
            src={ImgChat}
            alt="Chat con CashInBot"
            width={100}
            height={100}
          />
        </div>
        <p className="mt-2 text-lg font-bold">CashInBot</p>
      </div>
      <Modal
        open={open7}
        onClose={handleClose7}
        aria-labelledby="modal-modal-title7"
        aria-describedby="modal-modal-description7"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title7"
            variant="h6"
            component="h2"
            className="font-bold text-[#0095a9] text-center"
          >
            Poder chatear con CashInBot
          </Typography>
          <Typography
            id="modal-modal-description7"
            className="text-center"
            sx={{ mt: 2 }}
          >
            Interactúa con nuestro asistente virtual para resolver tus dudas
            financieras. Al{" "}
            <a href="/User/Login" className="font-bold">
              registrarte
            </a>
            , podrás chatear de manera más personalizada y obtener respuestas
            rápidas a tus preguntas.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
