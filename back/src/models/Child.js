module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define('Child', {
      child_id: {
        type: DataTypes.INTEGER,    // Clave primaria auto incremental
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      child: {
        type: DataTypes.INTEGER,   // Columna 'child' tipo INTEGER
        allowNull: false,          // No permite valores nulos
      },
    }, {
      tableName: 'Child',   // Nombre de la tabla en la base de datos
      timestamps: false,    // Deshabilitar timestamps automáticos
    });
  
    return Child;
  };