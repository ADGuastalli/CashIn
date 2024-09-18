const { Router } = require("express")
const passport = require('passport');

const userController = require('../controllers/Users/userController')
const cityController = require('../controllers/City/cityController');
const countryController = require('../controllers/Country/countryController')
const childController = require('../controllers/Child/Child')
const debtController = require('../controllers/Debt/debt');
const debtCategoryController = require('../controllers/DebtCategory/debtCategory');
const dwellingController = require('../controllers/Dwelling/dwelling');
const expenseController = require('../controllers/Expense/expense');
const expenseTypeController = require('../controllers/ExpenseType/expenseType');
const goalController = require('../controllers/Goal/goal');
const goalCategoryController = require('../controllers/GoalCategory/goalCategory');
const incomeController = require('../controllers/Income/income');
const maritalStatusController = require('../controllers/MaritalStatus/maritalStatus');
const modelDataController = require('../controllers/ModelData/modelData');
const monthlyIncomeTypeController = require('../controllers/MonthlyIncomeType/monthlyIncomeType');
const occupationController = require('../controllers/Occupation/occupation');
const payMethodController = require('../controllers/PayMethod/payMethod');
const personalPropertyController = require('../controllers/PersonalProperty/personalProperty');
const personalPropertyTypeController = require('../controllers/PersonalPropertyType/personalPropertyType');
const savingController = require('../controllers/Saving/saving');
const statusController = require('../controllers/Status/status');
const { authenticateToken } = require('../middlewares/auth');
const { googleAuth } = require("../controllers/Auth/google");
const { facebookAuth } = require("../controllers/Auth/facebook");



const router = Router();

router.post('/users', userController.postUser);
router.post('/users/login', userController.loginUser)
router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.post('/cities', cityController.createCity);
router.get('/cities', cityController.getAllCities);
router.get('/cities/:id', cityController.getCityById);
router.put('/cities/:id', cityController.updateCity);
router.delete('/cities/:id', cityController.deleteCity);

router.post('/country', countryController.createCountry);
router.get('/country', countryController.getAllCountries);
router.get('/country/:id', countryController.getCountryById);
router.put('/country/:id', countryController.updateCountry);
router.delete('/country/:id', countryController.deleteCountry);

router.post('/child', childController.createChild);
router.get('/child', childController.getAllChildren);
router.get('/child:id', childController.getChildById);
router.put('/child/:id', childController.updateChild);
router.delete('/child/:id', childController.deleteChild);

router.post('/debt', debtController.createDebt);
router.get('/debt', debtController.getAllDebts);
router.get('/debt/:id', debtController.getDebtById);
router.put('/debt/:id', debtController.updateDebt);
router.delete('/debt/:id', debtController.deleteDebt);

router.post('/debt-category', debtCategoryController.createDebtCategory);
router.get('/debt-category', debtCategoryController.getAllDebtCategories);
router.get('/debt-category/:id', debtCategoryController.getDebtCategoryById);
router.put('/debt-category/:id', debtCategoryController.updateDebtCategory);
router.delete('/debt-category/:id', debtCategoryController.deleteDebtCategory);

router.post('/dwelling', dwellingController.createDwelling);
router.get('/dwelling', dwellingController.getAllDwellings);
router.get('/dwelling/:id', dwellingController.getDwellingById);
router.put('/dwelling/:id', dwellingController.updateDwelling);
router.delete('/dwelling/:id', dwellingController.deleteDwelling);

router.post('/expense', expenseController.createExpense);
router.get('/expense', expenseController.getAllExpenses);
router.get('/expense/:id', expenseController.getExpenseById);
router.put('/expense/:id', expenseController.updateExpense);
router.delete('/expense/:id', expenseController.deleteExpense);

router.post('/expense-types', expenseTypeController.createExpenseType);
router.get('/expense-types', expenseTypeController.getAllExpenseTypes);
router.get('/expense-types/:id', expenseTypeController.getExpenseTypeById);
router.put('/expense-types/:id', expenseTypeController.updateExpenseType);
router.delete('/expense-types/:id', expenseTypeController.deleteExpenseType);

router.post('/goals', goalController.createGoal);
router.get('/goals', goalController.getAllGoals);
router.get('/goals/:id', goalController.getGoalById);
router.put('/goals/:id', goalController.updateGoal);
router.delete('/goals/:id', goalController.deleteGoal);

router.post('/goal-categories', goalCategoryController.createGoalCategory);
router.get('/goal-categories', goalCategoryController.getAllGoalCategories);
router.get('/goal-categories/:id', goalCategoryController.getGoalCategoryById);
router.put('/goal-categories/:id', goalCategoryController.updateGoalCategory);
router.delete('/goal-categories/:id', goalCategoryController.deleteGoalCategory);

router.post('/incomes', incomeController.createIncome);
router.get('/incomes', incomeController.getAllIncomes);
router.get('/incomes/:id', incomeController.getIncomeById);
router.put('/incomes/:id', incomeController.updateIncome);
router.delete('/incomes/:id', incomeController.deleteIncome);

router.post('/marital-status', maritalStatusController.createMaritalStatus);
router.get('/marital-status', maritalStatusController.getAllMaritalStatuses);
router.get('/marital-status/:id', maritalStatusController.getMaritalStatusById);
router.put('/marital-status/:id', maritalStatusController.updateMaritalStatus);
router.delete('/marital-status/:id', maritalStatusController.deleteMaritalStatus);

router.post('/model-data', modelDataController.createModelData);
router.get('/model-data', modelDataController.getAllModelData);
router.get('/model-data/:id', modelDataController.getModelDataById);
router.put('/model-data/:id', modelDataController.updateModelData);
router.delete('/model-data/:id', modelDataController.deleteModelData);

router.post('/monthly-income-type', monthlyIncomeTypeController.createMonthlyIncomeType);
router.get('/monthly-income-type', monthlyIncomeTypeController.getAllMonthlyIncomeTypes);
router.get('/monthly-income-type/:id', monthlyIncomeTypeController.getMonthlyIncomeTypeById);
router.put('/monthly-income-type/:id', monthlyIncomeTypeController.updateMonthlyIncomeType);
router.delete('/monthly-income-type/:id', monthlyIncomeTypeController.deleteMonthlyIncomeType);

router.post('/occupation', occupationController.createOccupation);
router.get('/occupation', occupationController.getAllOccupations);
router.get('/occupation/:id', occupationController.getOccupationById);
router.put('/occupation/:id', occupationController.updateOccupation);
router.delete('/occupation/:id', occupationController.deleteOccupation);

router.post('/paymethod', payMethodController.createPayMethod);
router.get('/paymethod', payMethodController.getAllPayMethods);
router.get('/paymethod/:id', payMethodController.getPayMethodById);
router.put('/paymethod/:id', payMethodController.updatePayMethod);
router.delete('/paymethod/:id', payMethodController.deletePayMethod);

router.post('/personalproperty', personalPropertyController.createPersonalProperty);
router.get('/personalproperty', personalPropertyController.getAllPersonalProperties);
router.get('/personalproperty/:id', personalPropertyController.getPersonalPropertyById);
router.put('/personalproperty/:id', personalPropertyController.updatePersonalProperty);
router.delete('/personalproperty/:id', personalPropertyController.deletePersonalProperty);

router.post('/personalpropertytype', personalPropertyTypeController.createPersonalPropertyType);
router.get('/personalpropertytype', personalPropertyTypeController.getAllPersonalPropertyTypes);
router.get('/personalpropertytype/:id', personalPropertyTypeController.getPersonalPropertyTypeById);
router.put('/personalpropertytype/:id', personalPropertyTypeController.updatePersonalPropertyType);
router.delete('/personalpropertytype/:id', personalPropertyTypeController.deletePersonalPropertyType);

router.post('/saving', savingController.createSaving);
router.get('/saving', savingController.getAllSavings);
router.get('/saving/:id', savingController.getSavingById);
router.put('/saving/:id', savingController.updateSaving);
router.delete('/saving/:id', savingController.deleteSaving);

router.post('/status', statusController.createStatus);
router.get('/status', statusController.getAllStatuses);
router.get('/status/:id', statusController.getStatusById);
router.put('/status/:id', statusController.updateStatus);
router.delete('/status/:id', statusController.deleteStatus);

// Iniciar autenticación con Facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Callback de autenticación de Facebook
router.get('/auth/facebook/callback', facebookAuth);

// Iniciar autenticación con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de autenticación de Google
router.get('/auth/google/callback', googleAuth);

module.exports = router; 

