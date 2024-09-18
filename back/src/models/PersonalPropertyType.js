module.exports = (sequelize, DataTypes) => {
  const PersonalPropertyType = sequelize.define('PersonalPropertyType', {
    personal_property_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    personal_property_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'PersonalPropertyType',
    timestamps: false,
  });

  return PersonalPropertyType;
};