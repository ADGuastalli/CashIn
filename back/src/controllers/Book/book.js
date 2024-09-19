// src/controllers/bookController.js
const { Book } = require('../../models/index');

// Crear un nuevo libro
const createBook = async (req, res) => {
  const { book } = req.body;
  try {
    const newBook = await Book.create({ book });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error al crear el libro:', error);
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

// Obtener todos los libros
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
};

// Obtener un libro por ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(200).json(book);
  } catch (error) {
    console.error('Error al obtener el libro:', error);
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};

// Actualizar un libro por ID
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { book } = req.body;
  try {
    const updated = await Book.update({ book }, { where: { book_id: id } });
    if (!updated[0]) return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(200).json({ message: 'Libro actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

// Eliminar un libro por ID
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Book.destroy({ where: { book_id: id } });
    if (!deleted) return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(200).json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
