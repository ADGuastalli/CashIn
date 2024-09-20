module.exports = (sequelize, DataTypes) => {
  const PersonalProperty = sequelize.define('PersonalProperty', {
    personal_property_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    personal_property_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    personal_property: {
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
    tableName: 'PersonalProperty',
    timestamps: false,
  });

  return PersonalProperty;
};
