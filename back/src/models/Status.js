module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    status_id: {
      type: DataTypes.INTEGER,  // Clave primaria auto incremental
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),  // Columna 'status' tipo VARCHAR(100)
      allowNull: false,             // No permite valores nulos
    },
  }, {
    tableName: 'Status',  // Nombre de la tabla en la base de datos
    timestamps: false,    // Deshabilitar timestamps automáticos
  });

  return Status;
};