module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Session', {
    session_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'sessions',
    timestamps: false,
  });
};
