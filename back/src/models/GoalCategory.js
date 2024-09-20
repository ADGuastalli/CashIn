module.exports = (sequelize, DataTypes) => {
  const GoalCategory = sequelize.define('GoalCategory', {
    goal_category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    goal_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'GoalCategory',
    timestamps: false,
  });

  return GoalCategory;
};