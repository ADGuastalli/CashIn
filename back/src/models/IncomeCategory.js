module.exports = (sequelize, DataTypes) => {
    const IncomeCategory = sequelize.define('IncomeCategory', {
      income_category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      income_category: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    }, {
      tableName: 'IncomeCategory', // Opcional si deseas que la tabla tenga el mismo nombre
      timestamps: false, // Opción si no deseas campos createdAt y updatedAt
    });
  
    return IncomeCategory;
  };