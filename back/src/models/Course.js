module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
      course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    }, {
      tableName: 'Course', // Nombre de la tabla
      timestamps: false,  // Desactivar createdAt y updatedAt
    });
  
    return Course;
  };
  