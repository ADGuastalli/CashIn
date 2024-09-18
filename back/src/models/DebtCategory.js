module.exports = (sequelize, DataTypes) => {
  const DebtCategory = sequelize.define('DebtCategory', {
    debt_category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    debt_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'DebtCategory',
    timestamps: false,
  });

  return DebtCategory;
};