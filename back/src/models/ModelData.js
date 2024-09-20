module.exports = (sequelize, DataTypes) => {
    const ModelData = sequelize.define('ModelData', {
      model_data_id: {
        type: DataTypes.INTEGER,  // Clave primaria auto incremental
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      data1: {
        type: DataTypes.STRING(255),  // Columna data1 tipo VARCHAR(255)
        allowNull: true,  // Permite valores nulos
      },
      data2: {
        type: DataTypes.STRING(255),  // Columna data2 tipo VARCHAR(255)
        allowNull: true,
      },
      data3: {
        type: DataTypes.STRING(255),  // Columna data3 tipo VARCHAR(255)
        allowNull: true,
      },
    }, {
      tableName: 'ModelData',  // Nombre de la tabla en la base de datos
      timestamps: false,       // Deshabilitar timestamps automáticos
    });
  
    return ModelData;
  };