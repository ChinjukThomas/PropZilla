const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { register, login, updatePassword, getUserById, getAllUsers} = require('./auth.controller');
const { validateRegister, validateLogin, validatePasswordUpdate } = require('./user.validator');
const validateRequest = require('../middleware/validateRequest');


const router = express.Router();

router.post('/register', validateRegister, validateRequest, register);
router.post('/login', validateLogin, validateRequest, login);
router.patch('/update-password', authenticate, validatePasswordUpdate, validateRequest, updatePassword);
router.get('/', authenticate, getAllUsers);
router.get('/:id', authenticate, getUserById);


module.exports = router;

