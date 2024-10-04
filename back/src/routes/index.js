const { Router } = require("express")

const userController = require('../controllers/Users/userController')
const cityController = require('../controllers/City/cityController');
const countryController = require('../controllers/Country/countryController')
const childController = require('../controllers/Child/Child')
const debtController = require('../controllers/Debt/debt');
const debtCategoryController = require('../controllers/DebtCategory/debtCategory');
const dwellingController = require('../controllers/Dwelling/dwelling');
const expenseController = require('../controllers/Expense/expense');
const expenseCategoryController = require('../controllers/ExpenseCategory/expenseCategory');
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
const courseController = require('../controllers/Course/course');
const bookController = require('../controllers/Book/book');
const calendarControllers = require('../controllers/CalendarControllers/calendarController')
const incomeCategoryController = require('../controllers/IncomeCategory/IncomeCategory');
const financialLevelController = require('../controllers/FinancialLevel/financialLevel');
const calculatorInconmeExpenses = require('../controllers/CalculatorIncome&expenses/CalculatorIncome&expensesTotal')
const calculatorInconmeExpensesMonthly = require('../controllers/CalculatorIncome&expenses/CalculatorIncome&expensesMonth')
const dataServiceController = require('../controllers/DataService/DataService');
const bankController = require('../controllers/Bank/bank');
const serviceController = require('../controllers/Service/service');
const calculatesavingsController = require('../controllers/CalculateSavingsPlan/calculateSavingsPlan');
const { authenticateToken } = require('../middlewares/auth');
const googleAuthController = require("../controllers/Auth/google");
const paypalController = require("../controllers/Paypal/paypalController");

const router = Router();

router.post("/users", userController.postUser);
router.post("/users/login", userController.loginUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.deleteUser);

router.put("/user/:userId", userController.updateUser);
router.put(
  "/user/:userId/complete-profile",
  userController.completeUserProfile
);

router.post("/cities", cityController.createCity);
router.get("/cities", cityController.getAllCities);
router.get("/cities/:id", cityController.getCityById);
router.put("/cities/:id", cityController.updateCity);
router.delete("/cities/:id", cityController.deleteCity);

router.post("/country", countryController.createCountry);
router.get("/country", countryController.getAllCountries);
router.get("/country/:id", countryController.getCountryById);
router.put("/country/:id", countryController.updateCountry);
router.delete("/country/:id", countryController.deleteCountry);

router.post("/child", childController.createChild);
router.get("/child", childController.getAllChildren);
router.get("/child:id", childController.getChildById);
router.put("/child/:id", childController.updateChild);
router.delete("/child/:id", childController.deleteChild);

router.post("/debt", debtController.createDebt);
router.get("/debt-by-user/:id", debtController.getAllDebts);
router.get("/debt/:id", debtController.getDebtById);
router.put("/debt/:id", debtController.updateDebt);
router.delete("/debt/:id", debtController.deleteDebt);

router.post("/debt-category", debtCategoryController.createDebtCategory);
router.get("/debt-category", debtCategoryController.getAllDebtCategories);
router.get("/debt-category/:id", debtCategoryController.getDebtCategoryById);
router.put("/debt-category/:id", debtCategoryController.updateDebtCategory);
router.delete("/debt-category/:id", debtCategoryController.deleteDebtCategory);

router.post("/dwelling", dwellingController.createDwelling);
router.get("/dwelling", dwellingController.getAllDwellings);
router.get("/dwelling/:id", dwellingController.getDwellingById);
router.put("/dwelling/:id", dwellingController.updateDwelling);
router.delete("/dwelling/:id", dwellingController.deleteDwelling);

router.post("/expense", expenseController.createExpense);
router.get("/expense-by-user/:id", expenseController.getAllExpenses);
router.get("/expense/:id", expenseController.getExpenseById);
router.put("/expense/:id", expenseController.updateExpense);
router.delete("/expense/:id", expenseController.deleteExpense);

router.post("/expense-types", expenseCategoryController.createExpenseCategory);
router.get("/expense-types", expenseCategoryController.getAllExpenseCategorys);
router.get(
  "/expense-types/:id",
  expenseCategoryController.getExpenseCategoryById
);
router.put(
  "/expense-types/:id",
  expenseCategoryController.updateExpenseCategory
);
router.delete(
  "/expense-types/:id",
  expenseCategoryController.deleteExpenseCategory
);

router.post("/goals", goalController.createGoal);
router.get("/goals", goalController.getAllGoals);
router.get("/goals/:id", goalController.getGoalById);
router.put("/goals/:id", goalController.updateGoal);
router.delete("/goals/:id", goalController.deleteGoal);

router.post('/incomes', incomeController.createIncome);
router.get('/incomes-by-user/:id', incomeController.getAllIncomes);
router.get('/incomes/:id', incomeController.getIncomeById);
router.put('/incomes/:id', incomeController.updateIncome);
router.delete('/incomes/:id', incomeController.deleteIncome);

router.post("/goal-categories", goalCategoryController.createGoalCategory);
router.get("/goal-categories", goalCategoryController.getAllGoalCategories);
router.get("/goal-categories/:id", goalCategoryController.getGoalCategoryById);
router.put("/goal-categories/:id", goalCategoryController.updateGoalCategory);
router.delete(
  "/goal-categories/:id",
  goalCategoryController.deleteGoalCategory
);

router.post(
  "/income-categories",
  incomeCategoryController.createIncomeCategory
);
router.get(
  "/income-categories",
  incomeCategoryController.getAllIncomeCategories
);
router.get(
  "/income-categories/:id",
  incomeCategoryController.getIncomeCategoryById
);
router.put(
  "/income-categories/:id",
  incomeCategoryController.updateIncomeCategory
);
router.delete(
  "/income-categories/:id",
  incomeCategoryController.deleteIncomeCategory
);

router.post("/marital-status", maritalStatusController.createMaritalStatus);
router.get("/marital-status", maritalStatusController.getAllMaritalStatuses);
router.get("/marital-status/:id", maritalStatusController.getMaritalStatusById);
router.put("/marital-status/:id", maritalStatusController.updateMaritalStatus);
router.delete(
  "/marital-status/:id",
  maritalStatusController.deleteMaritalStatus
);

router.post("/model-data", modelDataController.createModelData);
router.get("/model-data", modelDataController.getAllModelData);
router.get("/model-data/:id", modelDataController.getModelDataById);
router.put("/model-data/:id", modelDataController.updateModelData);
router.delete("/model-data/:id", modelDataController.deleteModelData);

router.post(
  "/monthly-income-type",
  monthlyIncomeTypeController.createMonthlyIncomeType
);
router.get(
  "/monthly-income-type",
  monthlyIncomeTypeController.getAllMonthlyIncomeTypes
);
router.get(
  "/monthly-income-type/:id",
  monthlyIncomeTypeController.getMonthlyIncomeTypeById
);
router.put(
  "/monthly-income-type/:id",
  monthlyIncomeTypeController.updateMonthlyIncomeType
);
router.delete(
  "/monthly-income-type/:id",
  monthlyIncomeTypeController.deleteMonthlyIncomeType
);

router.post("/occupation", occupationController.createOccupation);
router.get("/occupation", occupationController.getAllOccupations);
router.get("/occupation/:id", occupationController.getOccupationById);
router.put("/occupation/:id", occupationController.updateOccupation);
router.delete("/occupation/:id", occupationController.deleteOccupation);

router.post("/paymethod", payMethodController.createPayMethod);
router.get("/paymethod", payMethodController.getAllPayMethods);
router.get("/paymethod/:id", payMethodController.getPayMethodById);
router.put("/paymethod/:id", payMethodController.updatePayMethod);
router.delete("/paymethod/:id", payMethodController.deletePayMethod);

router.post(
  "/personalproperty",
  personalPropertyController.createPersonalProperty
);
router.get(
  "/personalproperty-by-user/:id",
  personalPropertyController.getAllPersonalProperties
);
router.get(
  "/personalproperty/:id",
  personalPropertyController.getPersonalPropertyById
);
router.put(
  "/personalproperty/:id",
  personalPropertyController.updatePersonalProperty
);
router.delete(
  "/personalproperty/:id",
  personalPropertyController.deletePersonalProperty
);

router.post(
  "/personalpropertytype",
  personalPropertyTypeController.createPersonalPropertyType
);
router.get(
  "/personalpropertytype",
  personalPropertyTypeController.getAllPersonalPropertyTypes
);
router.get(
  "/personalpropertytype/:id",
  personalPropertyTypeController.getPersonalPropertyTypeById
);
router.put(
  "/personalpropertytype/:id",
  personalPropertyTypeController.updatePersonalPropertyType
);
router.delete(
  "/personalpropertytype/:id",
  personalPropertyTypeController.deletePersonalPropertyType
);

router.post("/saving", savingController.createSaving);
router.get("/saving", savingController.getAllSavings);
router.get("/saving/:id", savingController.getSavingById);
router.put("/saving/:id", savingController.updateSaving);
router.delete("/saving/:id", savingController.deleteSaving);

router.post("/status", statusController.createStatus);
router.get("/status", statusController.getAllStatuses);
router.get("/status/:id", statusController.getStatusById);
router.put("/status/:id", statusController.updateStatus);
router.delete("/status/:id", statusController.deleteStatus);

router.post("/book", upload.single("imagePortada"), bookController.createBook);
router.get("/book", bookController.getAllBooks);
router.get("/book/:id", bookController.getBookById);
router.put(
  "/book/:id",
  upload.single("imagePortada"),
  bookController.updateBook
);
router.delete("/book/:id", bookController.deleteBook);

router.post("/course", courseController.createCourse);
router.get("/course", courseController.getAllCourses);
router.get("/course/:id", courseController.getCourseById);
router.put("/course/:id", courseController.updateCourse);
router.delete("/course/:id", courseController.deleteCourse);

router.post("/finzanciallevel", financialLevelController.createFinancialLevel);
router.get("/finzanciallevel", financialLevelController.getAllFinancialLevels);
router.get(
  "/finzanciallevel/:id",
  financialLevelController.getFinancialLevelById
);
router.put(
  "/finzanciallevel/:id",
  financialLevelController.updateFinancialLevel
);
router.delete(
  "/finzanciallevel/:id",
  financialLevelController.deleteFinancialLevel
);

// Callback de autenticación de Google
router.post("/auth/google", googleAuthController.googleAuth);

// Paypal
router.post(
  "/my-server/create-paypal-order",
  paypalController.createPaypalOrder
);
router.post(
  "/my-server/capture-paypal-order",
  paypalController.capturePaypalOrder
);

router.get("/available-slots", calendarControllers.getAvailableSlots);
router.get("/getReservedSlot", calendarControllers.getReservedSlots);

// Crear un nuevo slot (solo para admins)
router.post("/create-slot", calendarControllers.createSlot);

// Crear un nuevo evento (para usuarios comunes)
router.post("/create-event", calendarControllers.createEvent);

// Reservar un slot específico
router.post("/reserve-slot", calendarControllers.reserveSlot);

// Eliminar slots pasados no reservados
router.delete(
  "/delete-past-unreserved-slots",
  calendarControllers.deletePastUnreservedSlots
);

// Eliminar un slot
router.delete("/delete-slot", calendarControllers.deleteSlot);

router.get(
  "/incomesExpenses/totalincome/:id",
  calculatorInconmeExpenses.calculateTotalIncome
);
/* router.get(
  "/incomesExpenses/calculatetotalmortgagedebt/:id",

  calculatorInconmeExpenses.calculatePaidMortgageDebt
);
  calculatorInconmeExpenses.calculateTotalMortgageDebt
); */



router.get('/incomesExpenses/totalincome/:id', calculatorInconmeExpenses.calculateTotalIncome)
router.get('/incomesExpenses/calculatetotalmortgagedebt/:id', calculatorInconmeExpenses.calculatePaidMortgageDebt)
router.get('/incomesExpenses/calculatePaidPersonalLoans/:id', calculatorInconmeExpenses.calculatePaidPersonalLoans)
router.get('/incomesExpenses/calculatePaidVehicleLoans/:id', calculatorInconmeExpenses.calculatePaidVehicleLoans)
router.get('/incomesExpenses/calculateTotalHomeAndServicesExpenses/:id', calculatorInconmeExpenses.calculateTotalHomeAndServicesExpenses)
router.get('/incomesExpenses/calculateTotalFoodAndPersonalCareExpenses/:id', calculatorInconmeExpenses.calculateTotalFoodAndPersonalCareExpenses)
router.get('/incomesExpenses/calculateTotalVehicleExpenses/:id', calculatorInconmeExpenses.calculateTotalVehicleExpenses)
router.get('/incomesExpenses/calculateTotalTransportExpenses/:id', calculatorInconmeExpenses.calculateTotalTransportExpenses)
router.get('/incomesExpenses/calculateTotalMultipleCategoriesExpenses/:id', calculatorInconmeExpenses.calculateTotalMultipleCategoriesExpenses)
router.get('/incomesExpenses/calculateTotalVacationAndRecreationExpenses/:id', calculatorInconmeExpenses.calculateTotalVacationAndRecreationExpenses)

router.get('/incomesExpenses/totalincomeMonthly/:id', calculatorInconmeExpensesMonthly.calculateTotalIncomeMonthly)
router.get('/incomesExpenses/calculateMonthlyMortgageExpense/:id', calculatorInconmeExpensesMonthly.calculateMonthlyMortgageExpense)
router.get('/incomesExpenses/calculateMonthlyPersonalLoanExpense/:id', calculatorInconmeExpensesMonthly.calculateMonthlyPersonalLoanExpense)
router.get('/incomesExpenses/calculateMonthlyVehicleLoanExpense/:id', calculatorInconmeExpensesMonthly.calculateMonthlyVehicleLoanExpense)
router.get('/incomesExpenses/calculateMonthlyHomeAndServicesExpenses/:id', calculatorInconmeExpensesMonthly.calculateMonthlyHomeAndServicesExpenses)
router.get('/incomesExpenses/calculateMonthlyFoodAndPersonalCareExpenses/:id', calculatorInconmeExpensesMonthly.calculateMonthlyFoodAndPersonalCareExpenses)
router.get('/incomesExpenses/calculateMonthlyVehicleExpenses/:id', calculatorInconmeExpensesMonthly.calculateMonthlyVehicleExpenses)
router.get('/incomesExpenses/calculateMonthlyTransportExpenses/:id', calculatorInconmeExpensesMonthly.calculateMonthlyTransportExpenses)
router.get('/incomesExpenses/calculateMonthlyMultipleCategoriesExpenses/:id', calculatorInconmeExpensesMonthly.calculateMonthlyMultipleCategoriesExpenses)
router.get('/incomesExpenses/calculateMonthlyVacationAndRecreationExpenses/:id', calculatorInconmeExpensesMonthly.calculateMonthlyVacationAndRecreationExpenses)
router.get('/incomesExpenses/calculateMonthlyTithesAndSavings/:id', calculatorInconmeExpensesMonthly.calculateMonthlyTithesAndSavings)
router.get('/incomesExpenses/calculateMonthlyMiscellaneousExpenses/:id', calculatorInconmeExpensesMonthly.calculateMonthlyMiscellaneousExpenses)
router.get('/incomesExpenses/calculateMonthlyTotalExpenses/:id', calculatorInconmeExpensesMonthly.calculateMonthlyTotalExpenses)
router.get('/incomesExpenses/calculateNetIncomeMonthly/:id', calculatorInconmeExpensesMonthly.calculateNetIncomeMonthly)

router.get('/data-services', dataServiceController.getAllDataServices);
router.get('/data-services/:id', dataServiceController.getDataServiceById);
router.post('/data-services', dataServiceController.createDataService);
router.put('/data-services/:id', dataServiceController.updateDataService);
router.delete('/data-services/:id', dataServiceController.deleteDataService);

router.get('/banks', bankController.getAllBanks);
router.get('/banks/:id', bankController.getBankById);
router.post('/banks', bankController.createBank);
router.put('/banks/:id', bankController.updateBank);
router.delete('/banks/:id', bankController.deleteBank);

router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.post('/services', serviceController.createService);
router.put('/services/:id', serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);

router.post('/savings/simulate', calculatesavingsController.simulateSavingsPlan);

module.exports = router

