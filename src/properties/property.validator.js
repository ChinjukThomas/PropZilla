const { body } = require('express-validator');

const validateProperty = [
  body('title').notEmpty().withMessage('Title is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('price')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than zero'),
  body('bedrooms')
    .isInt({ min: 1 }).withMessage('Bedrooms must be at least 1'),
];

module.exports = { validateProperty };
