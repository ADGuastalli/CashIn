module.exports = (sequelize, DataTypes) => {
    const MaritalStatus = sequelize.define('MaritalStatus', {
      marital_status_id: {
        type: DataTypes.INTEGER,    // Clave primaria auto incremental
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      marital_status: {
        type: DataTypes.STRING(100),  // Columna 'marital_status' tipo VARCHAR(100)
        allowNull: false,             // No permite valores nulos
      },
    }, {
      tableName: 'MaritalStatus',  // Nombre de la tabla en la base de datos
      timestamps: false,           // Deshabilitar timestamps automáticos
    });
  
    return MaritalStatus;
  };