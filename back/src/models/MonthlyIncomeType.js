module.exports = (sequelize, DataTypes) => {
  const MonthlyIncomeType = sequelize.define('MonthlyIncomeType', {
    monthly_income_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    monthly_income: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'MonthlyIncomeType',
    timestamps: false,
  });

  return MonthlyIncomeType;
};