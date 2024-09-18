module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    expense_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    expense_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pay_method_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expense: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    mount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'Expense',
    timestamps: false,
  });

  return Expense;
};