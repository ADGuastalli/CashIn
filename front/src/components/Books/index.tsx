"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Libro1 from "../../public/assets/Libro1.png";
import Libro2 from "../../public/assets/Libro2.png";
import Libro3 from "../../public/assets/Libro3.png";
import Libro4 from "../../public/assets/Libro4.png";
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
      {/* Libro 1 */}
      <div>
        <Card sx={{ maxWidth: 280 }}>
          <Image
            src={Libro1}
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
            <Button size="small" onClick={handleOpen1}>
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
              tendrá la oportunidad de ver la historia del comercio, del dinero,
              los billetes y monedas...
            </Typography>
          </Box>
        </Modal>
      </div>

      {/* Libro 2 */}
      <div>
        <Card sx={{ maxWidth: 280 }}>
          <Image
            src={Libro2}
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
            <Button size="small" onClick={handleOpen2}>
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
              En “Academia de educación Financiera 2” consta de diez
              capítulos...
            </Typography>
          </Box>
        </Modal>
      </div>

      {/* Libro 3 */}
      <div>
        <Card sx={{ maxWidth: 272 }}>
          <Image
            src={Libro3}
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
            <Button size="small" onClick={handleOpen3}>
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
              En “Academia de educación Financiera 3” el participante tendrá la
              oportunidad de ver la historia de la globalización, el internet...
            </Typography>
          </Box>
        </Modal>
      </div>

      {/* Libro 4 */}
      <div>
        <Card sx={{ maxWidth: 272 }}>
          <Image
            src={Libro4}
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
            <Button size="small" onClick={handleOpen4}>
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
              once capítulos, el participante podrá conocer la administración...
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
