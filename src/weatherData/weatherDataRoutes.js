const {Router} = require('express');
const controller = require('./weatherDataController');

const router = Router();

router.get('/', controller.getWeatherData);
router.get('/:weatherDataId', controller.getWeatherDataById);
router.get('/location/:locationId', controller.getWeatherDataByLocationId);

module.exports = router;