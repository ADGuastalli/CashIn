module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.UUID,         
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,      
      allowNull: true,
    },
    city_id: {
      type: DataTypes.INTEGER,     
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,      
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(100),  
      allowNull: true,
    },
    user_name: {
      type: DataTypes.STRING(100),  
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,         
    },
    created_at: {
      type: DataTypes.DATE,         
      defaultValue: DataTypes.NOW,  
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  }, {
    tableName: 'User',              
    timestamps: false,             
  });

  return User;
};