const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importar los modelos
const City = require('./City');
const Country = require('./Country');
const Session = require('./Session');
const User = require('./User');

// Inicializar los modelos con la instancia de sequelize
const models = {
    User: User(sequelize, Sequelize.DataTypes),
    City: City(sequelize, Sequelize.DataTypes),
    Country: Country(sequelize, Sequelize.DataTypes),
    Session: Session(sequelize, Sequelize.DataTypes),
};

// Definir relaciones entre modelos

// Relación User <-> Country
models.User.belongsTo(models.Country, { foreignKey: 'country_id' });
models.Country.hasMany(models.User, { foreignKey: 'country_id' });

// Relación User <-> City
models.User.belongsTo(models.City, { foreignKey: 'city_id' });
models.City.hasMany(models.User, { foreignKey: 'city_id' });

// Relación User <-> Session
models.User.hasMany(models.Session, { foreignKey: 'user_id' });
models.Session.belongsTo(models.User, { foreignKey: 'user_id' });

// Relación muchos a muchos User <-> Country (UserCountry)
const UserCountry = sequelize.define('UserCountry', {}, { timestamps: false });
models.User.belongsToMany(models.Country, { through: UserCountry, foreignKey: 'data_id' });
models.Country.belongsToMany(models.User, { through: UserCountry, foreignKey: 'country_id' });

// Relación muchos a muchos User <-> City (UserCity)
const UserCity = sequelize.define('UserCity', {}, { timestamps: false });
models.User.belongsToMany(models.City, { through: UserCity, foreignKey: 'data_id' });
models.City.belongsToMany(models.User, { through: UserCity, foreignKey: 'city_id' });

// Relación muchos a muchos Country <-> City (CountryCity)
const CountryCity = sequelize.define('CountryCity', {}, { timestamps: false });
models.Country.belongsToMany(models.City, { through: CountryCity, foreignKey: 'country_id' });
models.City.belongsToMany(models.Country, { through: CountryCity, foreignKey: 'city_id' });

// Exportar sequelize y modelos
module.exports = {
    sequelize,
    ...models
};