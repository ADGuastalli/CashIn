module.exports = (sequelize, DataTypes) => {
    const PayMethod = sequelize.define('PayMethod', {
      pay_method_id: {
        type: DataTypes.INTEGER,        // Tipo INTEGER para el ID del método de pago
        primaryKey: true,
        autoIncrement: true,            // Auto incremento para generar el ID automáticamente
      },
      pay_method: {
        type: DataTypes.STRING(100),    // Cadena de texto para el nombre del método de pago, con máximo 100 caracteres
        allowNull: false,               // No permite valores nulos
      },
    }, {
      tableName: 'PayMethod',           // Nombre de la tabla en la base de datos
      timestamps: false,                // Deshabilitar timestamps automáticos
    });
  
    return PayMethod;
  };
  