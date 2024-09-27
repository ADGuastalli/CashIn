module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define('Income', {
      income_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      income_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      data_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      income: {
        type: DataTypes.STRING,
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
      tableName: 'Income',
      timestamps: false,
    });
  
    return Income;
  };