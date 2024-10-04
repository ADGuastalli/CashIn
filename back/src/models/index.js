const Sequelize = require("sequelize");
const sequelize = require("../config/database");

// Importar los modelos
const City = require("./City");
const Country = require("./Country");
const Session = require("./Session");
const User = require("./User");
const Data = require("./Data");
const Status = require("./Status");
const Saving = require("./Saving");
const Expense = require("./Expense");
const Debt = require("./Debt");
const MonthlyIncomeType = require("./MonthlyIncomeType");
const Goal = require("./Goal");
const GoalCategory = require("./GoalCategory");
const Income = require("./Income");
const PersonalProperty = require("./PersonalProperty");
const DebtCategory = require("./DebtCategory");
const ExpenseCategory = require("./ExpenseCategory");
const PersonalPropertyType = require("./PersonalPropertyType");
const PayMethod = require("./PayMethod");
const ModelData = require("./ModelData");
const Occupation = require("./Occupation");
const MaritalStatus = require("./MaritalStatus");
const Dwelling = require("./Dwelling");
const Child = require("./Child");
const Book = require("./Book");
const Course = require("./Course");
const IncomeCategory = require("./IncomeCategory");
const FinancialLevel = require("./FinancialLevel");
const SlotModel = require("./Slot");

// Inicializar los modelos con la instancia de sequelize
const models = {
  Book: Book(sequelize, Sequelize.DataTypes),
  Child: Child(sequelize, Sequelize.DataTypes),
  City: City(sequelize, Sequelize.DataTypes),
  Country: Country(sequelize, Sequelize.DataTypes),
  Course: Course(sequelize, Sequelize.DataTypes),
  Data: Data(sequelize, Sequelize.DataTypes),
  Debt: Debt(sequelize, Sequelize.DataTypes),
  DebtCategory: DebtCategory(sequelize, Sequelize.DataTypes),
  Dwelling: Dwelling(sequelize, Sequelize.DataTypes),
  Expense: Expense(sequelize, Sequelize.DataTypes),
  ExpenseCategory: ExpenseCategory(sequelize, Sequelize.DataTypes),
  FinancialLevel: FinancialLevel(sequelize, Sequelize.DataTypes),
  Goal: Goal(sequelize, Sequelize.DataTypes),
  GoalCategory: GoalCategory(sequelize, Sequelize.DataTypes),
  Income: Income(sequelize, Sequelize.DataTypes),
  IncomeCategory: IncomeCategory(sequelize, Sequelize.DataTypes),
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
  SlotModel: SlotModel(sequelize, Sequelize.DataTypes),
};

// Definir relaciones entre modelos

// Country -> City (Uno a muchos)
models.Country.hasMany(models.City, { foreignKey: "country_id" });
models.City.belongsTo(models.Country, { foreignKey: "country_id" });

// User -> Country / User -> City (Uno a muchos)
models.Country.hasMany(models.User, { foreignKey: "country_id" });
models.User.belongsTo(models.Country, { foreignKey: "country_id" });

models.City.hasMany(models.User, { foreignKey: "city_id" });
models.User.belongsTo(models.City, { foreignKey: "city_id" });

// User -> Data (Uno a uno)
models.User.hasOne(models.Data, { foreignKey: "user_id" });
models.Data.belongsTo(models.User, { foreignKey: "user_id" });

// User -> Session (Uno a uno)
models.User.hasOne(models.Session, { foreignKey: "user_id" });
models.Session.belongsTo(models.User, { foreignKey: "user_id" });

// Data -> Occupation / MaritalStatus / Dwelling (Uno a muchos)
models.Occupation.hasMany(models.Data, { foreignKey: "occupation_id" });
models.Data.belongsTo(models.Occupation, { foreignKey: "occupation_id" });

models.MaritalStatus.hasMany(models.Data, { foreignKey: "marital_status_id" });
models.Data.belongsTo(models.MaritalStatus, {
  foreignKey: "marital_status_id",
});

models.Dwelling.hasMany(models.Data, { foreignKey: "dwelling_id" });
models.Data.belongsTo(models.Dwelling, { foreignKey: "dwelling_id" });

// Data -> Saving / Expense / Debt / Goal / Income / PersonalProperty (Uno a muchos)
models.Data.hasMany(models.Saving, { foreignKey: "data_id" });
models.Saving.belongsTo(models.Data, { foreignKey: "data_id" });

models.Data.hasMany(models.Expense, { foreignKey: "data_id" });
models.Expense.belongsTo(models.Data, { foreignKey: "data_id" });

models.Data.hasMany(models.Debt, { foreignKey: "data_id" });
models.Debt.belongsTo(models.Data, { foreignKey: "data_id" });

models.Data.hasMany(models.Goal, { foreignKey: "data_id" });
models.Goal.belongsTo(models.Data, { foreignKey: "data_id" });

models.Data.hasMany(models.Income, { foreignKey: "data_id" });
models.Income.belongsTo(models.Data, { foreignKey: "data_id" });

models.Data.hasMany(models.PersonalProperty, { foreignKey: "data_id" });
models.PersonalProperty.belongsTo(models.Data, { foreignKey: "data_id" });

// Expense -> ExpenseCategory (Uno a muchos)
models.ExpenseCategory.hasMany(models.Expense, {
  foreignKey: "expense_category_id",
});
models.Expense.belongsTo(models.ExpenseCategory, {
  foreignKey: "expense_category_id",
});

// Debt -> DebtCategory (Uno a muchos)
models.DebtCategory.hasMany(models.Debt, { foreignKey: "debt_category_id" });
models.Debt.belongsTo(models.DebtCategory, { foreignKey: "debt_category_id" });

// Goal -> GoalCategory (Uno a muchos)
models.GoalCategory.hasMany(models.Goal, { foreignKey: "goal_category_id" });
models.Goal.belongsTo(models.GoalCategory, { foreignKey: "goal_category_id" });

// PersonalProperty -> PersonalPropertyType (Uno a muchos)
models.PersonalPropertyType.hasMany(models.PersonalProperty, {
  foreignKey: "personal_property_category_id",
});
models.PersonalProperty.belongsTo(models.PersonalPropertyType, {
  foreignKey: "personal_property_category_id",
});

// Dentro de tu archivo de relaciones entre modelos
models.IncomeCategory.hasMany(models.Income, {
  foreignKey: "income_category_id",
});
models.Income.belongsTo(models.IncomeCategory, {
  foreignKey: "income_category_id",
});

// FinancialLevel -> Data (Uno a muchos)
models.FinancialLevel.hasMany(models.Data, {
  foreignKey: "financial_level_id",
});
models.Data.belongsTo(models.FinancialLevel, {
  foreignKey: "financial_level_id",
});

// Exportar sequelize y modelos
module.exports = {
  sequelize,
  ...models,
};
