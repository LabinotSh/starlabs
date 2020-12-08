const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
* @route GET api/user
* @desc  Get all the users
*/
router.get('/', userController.getAllUsers);

/**
* @route GET api/user/:userId
* @desc  Get one user by id
*/
router.get('/:userId', userController.getOneUser);

/**
* @route POST api/user/register
* @desc  Register a new user
*/
router.post('/register', userController.register);

/**
* @route POST api/user/login
* @desc  Log in the user
*/
router.post('/login', userController.login);

/**
* @route PUT api/user/update/:uId
* @desc  Update a user by id
*/
router.put('/update/:uId', userController.updateUser);

/**
* @route DELETE api/user/remove/:uId
* @desc  Delete a user by id
*/
router.delete('/remove/:uId', userController.deleteUser);

module.exports = router;

