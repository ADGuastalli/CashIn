"use client";
import React, { useEffect, useState } from "react";
import { createBook, getAllBooks, deleteBook } from "@/server/fetchBook";
import Swal from "sweetalert2";

interface Book {
  book_id: number;
  title: string;
  description: string;
  imagePortada: string;
}

const CreateBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePortada, setImagePortada] = useState<File | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagePortada) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor selecciona una imagen",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imagePortada", imagePortada);

    try {
      const result = await createBook(formData);
      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.error || "Error al crear el libro. Intente de nuevo.",
        });
      } else {
        // Actualiza el estado de books con el nuevo libro
        setBooks((prevBooks) => [
          ...prevBooks,
          {
            book_id: result.book_id,
            title,
            description,
            imagePortada: result.imagePortada,
          },
        ]);

        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Libro creado exitosamente!",
        });
        setTitle("");
        setDescription("");
        setImagePortada(null);
      }
    } catch (error) {
      console.error("Error al crear el libro:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear el libro. Intente de nuevo.",
      });
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await getAllBooks();
      setBooks(response);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este libro se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id.toString());
        Swal.fire("¡Eliminado!", "El libro ha sido eliminado.", "success");
        fetchBooks(); // Refresca la lista de libros
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el libro.", "error");
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-4">Libros Disponibles</h2>
        <div className="mt-4">
          {books.length === 0 ? (
            <p>No hay libros disponibles.</p>
          ) : (
            books.map((book) => (
              <div
                key={book.book_id}
                className="flex justify-between items-center bg-gray-200 p-3 rounded mb-2"
              >
                <div>
                  <h3 className="text-lg font-bold">{book.title}</h3>
                  <p className="text-gray-600">{book.imagePortada}</p>
                </div>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(book.book_id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Cargar Libros</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block" htmlFor="title">
            Titulo:
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block" htmlFor="description">
            Descripcion:
          </label>
          <textarea
            className="border border-gray-300 p-2 w-full"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block" htmlFor="imagePortada">
            Imagen de Portada:
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            id="image"
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setImagePortada(file);
            }}
          />
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          type="submit"
        >
          Cargar Libro
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
