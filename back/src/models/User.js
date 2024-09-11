module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      country_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      city_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      birthdate: {
          type: DataTypes.DATE,
      },
      last_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      user_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true, 
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
    }
  });

  return User;
};