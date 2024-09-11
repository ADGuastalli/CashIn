module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Country', {
    country_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'countries',
    timestamps: false,
  });
};