module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    city_id: {
      type: DataTypes.INTEGER,  // Clave primaria auto incremental
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,  // Foreign key que referencia a Country
      allowNull: false,
      references: {
        model: 'Country',  // Nombre de la tabla relacionada
        key: 'country_id',  // Clave referenciada
      },
    },
    city: {
      type: DataTypes.STRING(100),  // Columna 'city' tipo VARCHAR(100)
      allowNull: false,             // No permite valores nulos
    },
  }, {
    tableName: 'City',  // Nombre de la tabla en la base de datos
    timestamps: false,  // Deshabilitar timestamps automáticos
  });

  return City;
};