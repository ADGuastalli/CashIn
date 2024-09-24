"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "background.paper",
  border: "2px solid #0095a9",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  padding: 4,
};

export default function BooksComponet() {
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

  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-12">
      <div>
        <Card sx={{ maxWidth: 280 }}>
          <Image
            src="https://i.postimg.cc/yd9M4nwX/libro1.png"
            alt="Academia de educación Financiera 1"
            width={345}
            height={345}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Academia de educación Financiera 1
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={handleOpen1}
              className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105"
            >
              Leer más
            </Button>
          </CardActions>
        </Card>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title1"
          aria-describedby="modal-modal-description1"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title1" variant="h6" component="h2">
              Academia de educación Financiera 1
            </Typography>
            <Typography id="modal-modal-description1" sx={{ mt: 2 }}>
              En el libro “Academia de educación Financiera 1” el participante
              tendrá la oportunidad, en el desarrollo de sus ocho capítulos, de
              ver la historia del comercio, del dinero, los billetes y monedas
              para crear una marco conceptual sobre este importante tema. En los
              capítulos siguientes conocerá el concepto de ingresos y sus
              diferentes tipos; los gastos y la correcta distribución de los
              mismos, con lo cual tendrá la capacidad de elaborar su propio
              estado financiero. Adicionalmente aprenderá sobre el ahorro y la
              importancia del mismo. Tendrá la capacidad de identificar sus
              bienes y clasificarlos en activos, además de que conocerá el
              concepto de los pasivos o deudas. Adicionalmente podrá tener una
              inclusión adecuada al ámbito financiero, conociendo las diferentes
              instituciones financieras y los productos que ofrece.
            </Typography>
          </Box>
        </Modal>
      </div>

      <div>
        <Card sx={{ maxWidth: 280 }}>
          <Image
            src="https://i.postimg.cc/nrGNMrVX/libro2.png"
            alt="Academia de educación Financiera 2"
            width={345}
            height={345}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Academia de educación Financiera 2
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={handleOpen2}
              className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105"
            >
              Leer más
            </Button>
          </CardActions>
        </Card>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title2"
          aria-describedby="modal-modal-description2"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title2" variant="h6" component="h2">
              Academia de educación Financiera 2
            </Typography>
            <Typography id="modal-modal-description2" sx={{ mt: 2 }}>
              En “Academia de educación Financiera 2” consta de diez capítulos,
              en los que puede ver la historia de la banca, del dinero y cómo
              usarlo de manera adecuada; el concepto de los productos de
              bancarios, los ingresos y sus diferentes tipos; los gastos y la
              correcta distribución de los mismos, el ahorro y la importancia
              del mismo, podrá identificar sus bienes y clasificarlos en
              activos, además de que conocerá el concepto de los pasivos o
              deudas; así como las deducciones fiscales. Por otro lado aprenderá
              sobre la inteligencia financiera, la importancia de la
              planificación financiera y estratégica y como planificar su futuro
              a través del mapa de los sueños.
            </Typography>
          </Box>
        </Modal>
      </div>

      <div>
        <Card sx={{ maxWidth: 272 }}>
          <Image
            src="https://i.postimg.cc/hvBHSTnF/libro3.png"
            alt="Academia de educación Financiera 3"
            width={345}
            height={345}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Academia de educación Financiera 3
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={handleOpen3}
              className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105"
            >
              Leer más
            </Button>
          </CardActions>
        </Card>
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title3"
          aria-describedby="modal-modal-description3"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title3" variant="h6" component="h2">
              Academia de educación Financiera 3
            </Typography>
            <Typography id="modal-modal-description3" sx={{ mt: 2 }}>
              sus diez capítulos, de ver la historia de la globalización, el
              internet, comercio electrónico, los productos y servicios
              bancarios, las deudas, las inversiones, las deducciones fiscales,
              la inflación y el emprendurísmo. Las competencias a desarrollar
              son la inteligencia comercial, inteligencia financiera y la
              inteligencia intelectual. Adicionalmente tendrá que utilizar sus
              conocimientos matemáticos para resolver algunos de los problemas
              planteados al utilizar las fórmulas de cálculos de interés y las
              tasas de rendimiento, ejercicios de calculo del capital.
            </Typography>
          </Box>
        </Modal>
      </div>

      <div>
        <Card sx={{ maxWidth: 272 }}>
          <Image
            src="https://i.postimg.cc/kMQ0T1N7/libro4.png"
            alt="Academia de educación Financiera 4"
            width={345}
            height={345}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Academia de educación Financiera 4
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={handleOpen4}
              className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105"
            >
              Leer más
            </Button>
          </CardActions>
        </Card>
        <Modal
          open={open4}
          onClose={handleClose4}
          aria-labelledby="modal-modal-title4"
          aria-describedby="modal-modal-description4"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title4" variant="h6" component="h2">
              Academia de educación Financiera 4
            </Typography>
            <Typography id="modal-modal-description4" sx={{ mt: 2 }}>
              Por último “Academia de educación Financiera 4” a través de sus
              once capítulos, el participante podrá conocer la administración
              del dinero, la introducción al sistema financiero, conocerá los
              ingresos y gastos (correcta distribución y administración); las
              deducciones fiscales; los bienes los activos y pasivos, la
              planificación financiera para el desarrollo de un plan financiero
              personal o familiar, la inteligencia financiera, conocerá lo que
              es el empleo, oficios, ser empresario o emprendedor, las
              diferentes tipos de empresas que existen en republica dominicana y
              como se forman; por ultimo esta el tema de economía personal que
              trata de la correcta inclusión en el sistema financiero, los
              productos bancarios y cómo obtener los mismos.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
