const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importar los modelos
const City = require('./City');
const Country = require('./Country');
const Session = require('./Session');
const User = require('./User');
const Data = require('./Data');
const Status = require('./Status');
const Saving = require('./Saving');
const Expense = require('./Expense');
const Debt = require('./Debt');
const MonthlyIncomeType = require('./MonthlyIncomeType');
const Goal = require('./Goal');
const GoalCategory = require('./GoalCategory');
const Income = require('./Income')
const PersonalProperty = require('./PersonalProperty');
const DebtCategory = require('./DebtCategory');
const ExpenseType = require('./ExpenseType')
const PersonalPropertyType = require('./PersonalPropertyType');
const PayMethod = require('./PayMethod')
const ModelData = require('./ModelData');
const Occupation = require('./Occupation');
const MaritalStatus = require('./MaritalStatus');
const Dwelling = require('./Dwelling'); 
const Child = require('./Child');


// Inicializar los modelos con la instancia de sequelize
const models = {
    Child: Child(sequelize, Sequelize.DataTypes),
    City: City(sequelize, Sequelize.DataTypes),
    Country: Country(sequelize, Sequelize.DataTypes),
    Data: Data(sequelize, Sequelize.DataTypes),
    Debt: Debt(sequelize, Sequelize.DataTypes),
    DebtCategory: DebtCategory(sequelize, Sequelize.DataTypes),
    Dwelling: Dwelling(sequelize, Sequelize.DataTypes),
    Expense: Expense(sequelize, Sequelize.DataTypes),
    ExpenseType: ExpenseType(sequelize, Sequelize.DataTypes),
    Goal: Goal(sequelize, Sequelize.DataTypes),
    GoalCategory: GoalCategory(sequelize, Sequelize.DataTypes),
    Income: Income(sequelize, Sequelize.DataTypes),
    MaritalStatus: MaritalStatus(sequelize, Sequelize.DataTypes),
    ModelData: ModelData(sequelize, Sequelize.DataTypes),
    MonthlyIncomeType: MonthlyIncomeType(sequelize, Sequelize.DataTypes),
    Occupation: Occupation(sequelize, Sequelize.DataTypes),
    PayMethod: PayMethod(sequelize, Sequelize.DataTypes),
    PersonalProperty: PersonalProperty(sequelize, Sequelize.DataTypes),
    PersonalPropertyType: PersonalPropertyType(sequelize, Sequelize.DataTypes),
    Saving: Saving(sequelize, Sequelize.DataTypes),
    Session: Session(sequelize, Sequelize.DataTypes),
    Status: Status(sequelize, Sequelize.DataTypes),
    User: User(sequelize, Sequelize.DataTypes),
};

// // Definir relaciones entre modelos

// // Relación User <-> Country
// models.User.belongsTo(models.Country, { foreignKey: 'country_id' });
// models.Country.hasMany(models.User, { foreignKey: 'country_id' });

// // Relación User <-> City
// models.User.belongsTo(models.City, { foreignKey: 'city_id' });
// models.City.hasMany(models.User, { foreignKey: 'city_id' });

// // Relación User <-> Session
// models.User.hasMany(models.Session, { foreignKey: 'user_id' });
// models.Session.belongsTo(models.User, { foreignKey: 'user_id' });

// // Relación Data <-> User
// models.Data.belongsTo(models.User, { foreignKey: 'user_id' });
// models.User.hasOne(models.Data, { foreignKey: 'user_id' });

// // Relación Data <-> Status
// models.Data.belongsTo(models.Status, { foreignKey: 'status_id' });
// models.Status.hasOne(models.Data, { foreignKey: 'status_id' });

// // Relación Data <-> Saving
// models.Data.hasMany(models.Saving, { foreignKey: 'data_id' });
// models.Saving.belongsTo(models.Data, { foreignKey: 'data_id' });

// // Relación Data <-> Expense
// models.Data.hasMany(models.Expense, { foreignKey: 'data_id' });
// models.Expense.belongsTo(models.Data, { foreignKey: 'data_id' });

// // Relación Data <-> Debt
// models.Data.hasMany(models.Debt, { foreignKey: 'data_id' });
// models.Debt.belongsTo(models.Data, { foreignKey: 'data_id' });

// // Relación Data <-> MonthlyIncome
// models.Data.hasMany(models.MonthlyIncome, { foreignKey: 'data_id' });
// models.MonthlyIncome.belongsTo(models.Data, { foreignKey: 'data_id' });

// // Relación Data <-> Goal
// models.Data.hasMany(models.Goal, { foreignKey: 'data_id' });
// models.Goal.belongsTo(models.Data, { foreignKey: 'data_id' });

// // Relación Data <-> PersonalProperty
// models.Data.hasMany(models.PersonalProperty, { foreignKey: 'data_id' });
// models.PersonalProperty.belongsTo(models.Data, { foreignKey: 'data_id' });

// // Relación Expense <-> ExpenseCategory
// models.Expense.belongsTo(models.ExpenseCategory, { foreignKey: 'expense_category_id' });
// models.ExpenseCategory.hasMany(models.Expense, { foreignKey: 'expense_category_id' });

// // Relación Debt <-> DebtCategory
// models.Debt.belongsTo(models.DebtCategory, { foreignKey: 'debt_category_id' });
// models.DebtCategory.hasMany(models.Debt, { foreignKey: 'debt_category_id' });

// // Relación Goal <-> GoalCategory
// models.Goal.belongsTo(models.GoalCategory, { foreignKey: 'goal_category_id' });
// models.GoalCategory.hasMany(models.Goal, { foreignKey: 'goal_category_id' });

// // Relación MonthlyIncome <-> MonthlyIncomeCategory
// models.MonthlyIncome.belongsTo(models.MonthlyIncomeCategory, { foreignKey: 'monthly_income_category_id' });
// models.MonthlyIncomeCategory.hasMany(models.MonthlyIncome, { foreignKey: 'monthly_income_category_id' });

// // Relación PersonalProperty <-> PersonalPropertyCategory
// models.PersonalProperty.belongsTo(models.PersonalPropertyCategory, { foreignKey: 'personal_property_category_id' });
// models.PersonalPropertyCategory.hasMany(models.PersonalProperty, { foreignKey: 'personal_property_category_id' });

// Exportar sequelize y modelos
module.exports = {
    sequelize,
    ...models
};