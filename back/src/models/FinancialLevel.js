module.exports = (sequelize, DataTypes) => {
    const FinancialLevel = sequelize.define('FinancialLevel', {
      financialLevel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      financialLevel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'FinancialLevel',
      timestamps: false,
    });
  
    return FinancialLevel;
  };