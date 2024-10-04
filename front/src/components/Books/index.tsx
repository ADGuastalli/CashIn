"use client";
import React, { useEffect, useState } from "react";
import { API } from "@/helpers/helper"; // Asegúrate de que tu API esté configurada correctamente
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./BooksCarrusel.module.css";

// Cambia imageUrl a imagePortada en la interfaz
interface Libro {
  bookId: number;
  title: string;
  imagePortada: string; // Cambiado
  description: string;
}

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

const getAllBooks = async (): Promise<Libro[]> => {
  try {
    const response = await fetch(`${API}/book`, { method: "GET" });
    const data: Libro[] = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error al obtener libros:", error);
    return [];
  }
};

const BooksComponent: React.FC = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = useState<Libro | null>(null);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });

    const fetchBooks = async () => {
      const data = await getAllBooks();
      setLibros(data);
    };

    fetchBooks();
  }, []);

  const handleOpen = (book: Libro) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="flex justify-center items-center">
      {libros.length === 0 ? (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-200 p-5 rounded-lg text-center">
          <h3 className="text-xl font-bold">
            Proximamente podras encontrar todos los libros disponibles.
          </h3>
        </div>
      ) : (
        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            {libros.map((libro, index) => (
              <div key={`${libro.bookId}-${index}`} className={styles.bookItem}>
                <Card
                  sx={{ maxWidth: { xs: "100%", md: 350 } }}
                  className="hover:scale-105 transition-transform duration-300 bg-[#0095a919]"
                >
                  <Image
                    src={libro.imagePortada} // Cambiado de imageUrl a imagePortada
                    alt={libro.title}
                    width={345}
                    height={345}
                    style={{ width: "100%", height: "auto", padding: "10px" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="font-bold text-[#0095a9] text-center"
                    >
                      {libro.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <button
                      onClick={() => handleOpen(libro)}
                      className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
                    transition-transform duration-300 transform hover:scale-105"
                    >
                      Leer más
                    </button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedBook && (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="font-bold text-[#0095a9] text-center"
              >
                {selectedBook.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedBook.description}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BooksComponent;
