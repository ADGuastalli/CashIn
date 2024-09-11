const { Router } = require("express")

const userController = require('../controllers/Users/userController')
const cityController = require('../controllers/City/cityController');
const countryController = require('../controllers/Country/countryController')

const router = Router();

router.post('/users', userController.postUser);
router.get('/users', userController.getAllUsers);
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


module.exports = router; 

