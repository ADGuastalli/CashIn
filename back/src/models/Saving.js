module.exports = (sequelize, DataTypes) => {
  const Saving = sequelize.define('Saving', {
    saving_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saving: {
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
    tableName: 'Saving',
    timestamps: false,
  });

  return Saving;
};