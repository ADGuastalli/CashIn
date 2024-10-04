module.exports = (sequelize, DataTypes) => {
    const DataService = sequelize.define('DataService', {
      data_service: {
        type: DataTypes.INTEGER,    
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      bank_id: {
        type: DataTypes.INTEGER,    
        allowNull: false,           
      },
      service_id: {
        type: DataTypes.INTEGER,    
        allowNull: false,           
      },
      secuence: {
        type: DataTypes.INTEGER,    
        allowNull: false,           
      },
      opening_amount: {
        type: DataTypes.DECIMAL,    
        allowNull: false,           
      },
      interest_rate: {
        type: DataTypes.DECIMAL,    
        allowNull: false,           
      },
      requeriment: {
        type: DataTypes.TEXT,       
        allowNull: false,           
      },
      benefit_offered: {
        type: DataTypes.TEXT,       
        allowNull: false,           
      },
      trade_name: {
        type: DataTypes.TEXT,       
        allowNull: false,           
      },
    }, {
      tableName: 'DataService',     
      timestamps: false,            
    });
  
    return DataService;
  };
  