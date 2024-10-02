module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        // Título del curso
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        // Descripción del curso
        type: DataTypes.TEXT,
        allowNull: true, // Permitir que sea null si no se proporciona
      },
      topics: {
        // Temas del curso
        type: DataTypes.TEXT,
        allowNull: true, // Permitir que sea null si no se proporciona
      },
      duration: {
        // Duración del curso
        type: DataTypes.STRING(50), // Puedes ajustar el tamaño según tus necesidades
        allowNull: true,
      },
      level: {
        // Nivel del curso (ej. básico, intermedio, avanzado)
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      location: {
        // Lugar donde se dicta el curso
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      startDate: {
        // Fecha y horario de inicio del curso
        type: DataTypes.DATE, // Almacena tanto fecha como hora
        allowNull: true, // Permitir que sea null si no se proporciona
      },
    },
    {
      tableName: "Course", // Nombre de la tabla
      timestamps: false, // Desactivar createdAt y updatedAt
    }
  );

  return Course;
};
