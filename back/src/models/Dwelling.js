// models/dwellingModel.js

module.exports = (sequelize, DataTypes) => {
    const Dwelling = sequelize.define('Dwelling', {
      dwelling_id: {
        type: DataTypes.INTEGER,    // Clave primaria auto incremental
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dwelling: {
        type: DataTypes.STRING(100),  // Columna 'dwelling' tipo VARCHAR(100)
        allowNull: false,             // No permite valores nulos
      },
    }, {
      tableName: 'Dwelling',  // Nombre de la tabla en la base de datos
      timestamps: false,      // Deshabilitar timestamps automáticos
    });
  
    return Dwelling;
  };
  