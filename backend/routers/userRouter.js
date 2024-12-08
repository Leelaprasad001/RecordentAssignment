const express = require('express');
const { getAllUsersController, deleteAllUserController, signin, signup, refreshToken } = require('../controllers/userController');
const router = express.Router();

router.get('/getAll', getAllUsersController)
router.delete('/deleteAll', deleteAllUserController);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/refreshToken', refreshToken);

module.exports = router;