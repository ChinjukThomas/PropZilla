const express = require('express');
const { register, login } = require('./auth.controller');
const { validateRegister, validateLogin } = require('./user.validator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post('/register', validateRegister, validateRequest, register);
router.post('/login', validateLogin, validateRequest, login);
router.patch('/update-password', authenticate, validatePasswordUpdate, validateRequest, updatePassword);

module.exports = router;

