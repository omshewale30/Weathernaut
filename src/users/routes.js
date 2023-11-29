const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getUsers);
router.get('/:userid', controller.getUserById); //gets the user by id from the database using the query handler

router.get('/checkIfUserExists/:username/:password', controller.checkIfUserExists);

router.post('/', controller.createUser);
router.delete('/:userid', controller.deleteUser);


router.put('/:userid', controller.updateUser);
module.exports = router;