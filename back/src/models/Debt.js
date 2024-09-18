module.exports = (sequelize, DataTypes) => {
  const Debt = sequelize.define('Debt', {
    debt_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    debt_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    debt: {
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
    tableName: 'Debt',
    timestamps: false,
  });

  return Debt;
};