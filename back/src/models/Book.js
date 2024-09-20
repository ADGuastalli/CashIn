module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      book: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    }, {
      tableName: 'Book', // Nombre de la tabla
      timestamps: false,  // Desactivar createdAt y updatedAt
    });
  
    return Book;
  };
  