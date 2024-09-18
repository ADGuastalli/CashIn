module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: {
      type: DataTypes.INTEGER,       // Tipo INTEGER para el ID de la sesión
      primaryKey: true,
      autoIncrement: true,           // Auto incremento como en la base de datos
    },
    user_id: {
      type: DataTypes.INTEGER,       // Clave foránea, la relación estará en el index
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),   // Token de sesión, hasta 255 caracteres
      allowNull: false,
    },
  }, {
    tableName: 'Session',            // Nombre de la tabla en la base de datos
    timestamps: false,               // Deshabilitar timestamps automáticos
  });

  return Session;
};