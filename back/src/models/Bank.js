module.exports = (sequelize, DataTypes) => {
    const Bank = sequelize.define('Bank', {
      bank_id: {
        type: DataTypes.INTEGER,    
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.INTEGER,    
        allowNull: false,           
      },
      bank: {
        type: DataTypes.STRING,    
        allowNull: false,           
      },
    }, {
      tableName: 'Bank',            
      timestamps: false,            
    });
  
    return Bank;
  };
  