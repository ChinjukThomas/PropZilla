const { body } = require('express-validator');

const validateRegister = [
  body('email')
    .notEmpty().withMessage('Email is required').bail()
    .isEmail().withMessage('Valid email is required'),
    body('password')
    .notEmpty().withMessage('Password is required').bail()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Role must be user or admin'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const validatePasswordUpdate = [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long'),
  ];

module.exports = {
  validateRegister,
  validateLogin,
  validatePasswordUpdate,
};
