const { Book } = require("../../models/index");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Para eliminar la imagen temporal después de subirla

// Configurar multer para manejar la carga de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Carpeta temporal para las imágenes cargadas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  },
});

const upload = multer({ storage });

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: "dwnv1ivzs",
  api_key: "996276224776541",
  api_secret: process.env.API_CLAUDINARY,
});

// Crear un nuevo libro con imagen
const createBook = async (req, res) => {
  const { title, description } = req.body;
  console.log("Archivo cargado:", req.file.path);
  try {
    // Subir imagen a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "books", // Puedes organizar tus imágenes en carpetas
    });

    // Crear el libro con la URL de la imagen
    const newBook = await Book.create({
      title,
      description,
      imagePortada: result.secure_url,
    });

    // Eliminar la imagen temporal del servidor
    fs.unlinkSync(req.file.path);

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error al crear el libro:", error);
    res.status(500).json({ error: "Error al crear el libro" });
  }
};

// Obtener todos los libros
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

// Obtener un libro por ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: "Libro no encontrado" });
    res.status(200).json(book);
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    res.status(500).json({ error: "Error al obtener el libro" });
  }
};

// Actualizar un libro por ID
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    let updatedData = { title, description };

    // Si se carga una nueva imagen, subirla a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "books",
      });

      updatedData.imagePortada = result.secure_url;

      // Eliminar la imagen temporal del servidor
      fs.unlinkSync(req.file.path);
    }

    const updated = await Book.update(updatedData, {
      where: { book_id: id },
    });

    if (!updated[0])
      return res.status(404).json({ error: "Libro no encontrado" });
    res.status(200).json({ message: "Libro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
};

// Eliminar un libro por ID
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Book.destroy({ where: { book_id: id } });
    if (!deleted) return res.status(404).json({ error: "Libro no encontrado" });
    res.status(200).json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  upload,
};
