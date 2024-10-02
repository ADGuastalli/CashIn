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
      type: DataTypes.STRING,
      allowNull: false,
    },
    mount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    recurrence:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    cuote: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mount_cuote: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
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