import React, { useState, useEffect } from "react";
import {
  createCourse,
  getAllCourses,
  deleteCourse,
} from "../../server/fetchCourse"; // Asegúrate de que la ruta sea correcta
import Swal from "sweetalert2"; // Importa SweetAlert2

const levels = [
  { label: "Principiante", value: "Principiante", color: "bg-green-200" },
  { label: "Intermedio", value: "Intermedio", color: "bg-yellow-200" },
  { label: "Avanzado", value: "Avanzado", color: "bg-red-200" },
  { label: "Especializado", value: "Especializado", color: "bg-blue-200" },
];

interface Curso {
  courseId: number;
  title: string;
  level: string;
  startDate: string; // Fecha en formato ISO
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

const CreateCourse: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState(""); // Cambiado a string
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [cursos, setCursos] = useState<Curso[]>([]); // Para almacenar los cursos disponibles

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = {
      title,
      description,
      topics,
      duration,
      level,
      location,
      startDate,
    };

    try {
      const result = await createCourse(courseData);
      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.error || "Error al crear el curso. Inténtalo de nuevo.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Curso creado exitosamente!",
        });

        // Actualiza el estado de cursos con el nuevo curso
        setCursos((prevCursos) => [
          ...prevCursos,
          { ...courseData, courseId: result.courseId, startDate }, // Asegúrate de incluir el courseId devuelto
        ]);

        // Limpia los campos del formulario
        setTitle("");
        setDescription("");
        setTopics(""); // Limpiar el campo de temas
        setDuration("");
        setLevel("");
        setLocation("");
        setStartDate("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear el curso. Inténtalo de nuevo.",
      });
      console.error("Error en la creación del curso:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCursos(data);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este curso se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      try {
        await deleteCourse(id.toString());
        Swal.fire("¡Eliminado!", "El curso ha sido eliminado.", "success");
        fetchCourses(); // Refresca la lista de cursos
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el curso.", "error");
      }
    }
  };

  useEffect(() => {
    fetchCourses(); // Carga los cursos al montar el componente
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cursos Disponibles</h2>
        <div className="mt-4">
          {cursos.length === 0 ? (
            <p>No hay cursos disponibles.</p>
          ) : (
            cursos.map((curso) => (
              <div
                key={curso.courseId}
                className="flex justify-between items-center bg-gray-200 p-3 rounded mb-2"
              >
                <div>
                  <h3 className="text-lg font-bold">{curso.title}</h3>
                  <p>Nivel: {curso.level}</p>
                  <p>
                    Fecha:{" "}
                    <span className="font-normal">
                      {formatDate(curso.startDate)}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(curso.courseId)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Crear Curso</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Aquí va el formulario para crear cursos */}
        <div>
          <label className="block">Título:</label>
          <input
            type="text"
            value={title}
            placeholder="Título del Curso"
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del Curso"
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div>
          <label className="block">
            Temas Principales (separados por comas):
          </label>
          <input
            type="text"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="Ej: Tema 1, Tema 2, Tema 3"
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Duración:</label>
          <input
            type="text"
            value={duration}
            placeholder="Duración del Curso. Ej: 3 horas"
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Nivel</label>
          <div className="flex space-x-2">
            {levels.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setLevel(item.value)}
                className={`p-2 rounded ${item.color} text-gray-800`}
                style={{
                  border: level === item.value ? "2px solid black" : "none",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block">Lugar:</label>
          <input
            type="text"
            value={location}
            placeholder="Lugar donde se llevará a cabo el curso. Ej: Presencial(Ciudad), Online(Plataforma)"
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Fecha de Inicio:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Crear Curso
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
