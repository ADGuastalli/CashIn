module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define('Income', {
      income_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      income_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      income: {
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
      tableName: 'Income',
      timestamps: false,
    });
  
    return Income;
  };