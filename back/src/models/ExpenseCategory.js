module.exports = (sequelize, DataTypes) => {
  const ExpenseType = sequelize.define('ExpenseCategory', {
    expense_category_id: {
      type: DataTypes.INTEGER,       // Tipo INTEGER para el ID del tipo de gasto
      primaryKey: true,
      autoIncrement: true,           // Auto incremento como en la base de datos
    },
    expense_category: {
      type: DataTypes.STRING(100),   // Cadena de texto para el tipo de gasto, con máximo 100 caracteres
      allowNull: false,
    },
  }, {
    tableName: 'ExpenseCategory',        // Nombre de la tabla en la base de datos
    timestamps: false,               // Deshabilitar timestamps automáticos
  });

  return ExpenseType;
};