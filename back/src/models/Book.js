module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        // Nuevo campo para el título
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        // Nuevo campo para la descripción
        type: DataTypes.TEXT,
        allowNull: true, // Puede ser opcional
      },
      imagePortada: {
        // Nuevo campo para la imagen
        type: DataTypes.STRING(255), // Guardará la URL o ruta de la imagen
        allowNull: true, // Puede ser opcional si no se carga la imagen
      },
    },
    {
      tableName: "Book", // Nombre de la tabla
      timestamps: false, // Desactivar createdAt y updatedAt
    }
  );

  return Book;
};
