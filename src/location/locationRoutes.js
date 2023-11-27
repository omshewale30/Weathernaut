const {Router} = require('express');
const locationController = require('./locationController');

const router = Router();

router.get('/', locationController.getLocation);

router.get('/:locationid', locationController.getLocationId); //gets the user by id from the database using the query handler


module.exports = router;