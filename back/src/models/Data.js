module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define('Data', {
    data_id: {
      type: DataTypes.INTEGER,  // Clave primaria auto incremental
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    expense_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Expense
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Status
      allowNull: true,
    },
    debt_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Debt
      allowNull: true,
    },
    goal_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Goal
      allowNull: true,
    },
    income_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Income
      allowNull: true,
    },
    personal_property_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de PersonalProperty
      allowNull: true,
    },
    occupation_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Occupation
      allowNull: true,
    },
    marital_status_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de MaritalStatus
      allowNull: true,
    },
    dwelling_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Dwelling
      allowNull: true,
    },
    child_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Child
      allowNull: true,
    },
    financial_level_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Child
      allowNull: true,
    },
    saving_id: {
      type: DataTypes.INTEGER,   // Columna para almacenar el ID de Saving
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,      // Columna para la fecha de creación
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  }, {
    tableName: 'Data',  // Nombre de la tabla en la base de datos
    timestamps: false,  // Deshabilitar timestamps automáticos
  });

  return Data;
};