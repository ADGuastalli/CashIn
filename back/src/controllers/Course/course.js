// src/controllers/courseController.js
const { Course } = require('../../models/index');

// Crear un nuevo curso
const createCourse = async (req, res) => {
  const { course } = req.body;
  try {
    const newCourse = await Course.create({ course });
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error al crear el curso:', error);
    res.status(500).json({ error: 'Error al crear el curso' });
  }
};

// Obtener todos los cursos
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error al obtener los cursos:', error);
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
};

// Obtener un curso por ID
const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });
    res.status(200).json(course);
  } catch (error) {
    console.error('Error al obtener el curso:', error);
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
};

// Actualizar un curso por ID
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { course } = req.body;
  try {
    const updated = await Course.update({ course }, { where: { course_id: id } });
    if (!updated[0]) return res.status(404).json({ error: 'Curso no encontrado' });
    res.status(200).json({ message: 'Curso actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
    res.status(500).json({ error: 'Error al actualizar el curso' });
  }
};

// Eliminar un curso por ID
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Course.destroy({ where: { course_id: id } });
    if (!deleted) return res.status(404).json({ error: 'Curso no encontrado' });
    res.status(200).json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
