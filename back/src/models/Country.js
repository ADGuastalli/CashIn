module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    country_id: {
      type: DataTypes.INTEGER,  // Clave primaria auto incremental
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),  // Columna 'country' tipo VARCHAR(100)
      allowNull: false,             // No permite valores nulos
    },
  }, {
    tableName: 'Country',  // Nombre de la tabla en la base de datos
    timestamps: false,     // Deshabilitar timestamps automáticos
  });

  return Country;
};