module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
      service_id: {
        type: DataTypes.INTEGER,    
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      service: {
        type: DataTypes.STRING,    
        allowNull: false,           
      },
    }, {
      tableName: 'Service',         
      timestamps: false,            
    });
  
    return Service;
  };
  