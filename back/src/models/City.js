module.exports = (sequelize, DataTypes) => {
  return sequelize.define('City', {
    city_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'cities',
    timestamps: false,
  });
};