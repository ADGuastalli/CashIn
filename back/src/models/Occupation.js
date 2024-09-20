module.exports = (sequelize, DataTypes) => {
    const Occupation = sequelize.define('Occupation', {
      occupation_id: {
        type: DataTypes.INTEGER,    // Clave primaria auto incremental
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      occupation: {
        type: DataTypes.STRING(100),  // Columna 'occupation' tipo VARCHAR(100)
        allowNull: false,             // No permite valores nulos
      },
    }, {
      tableName: 'Occupation',  // Nombre de la tabla en la base de datos
      timestamps: false,        // Deshabilitar timestamps automáticos
    });
  
    return Occupation;
  };