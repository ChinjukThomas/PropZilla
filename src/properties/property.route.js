const express = require('express');
const router = express.Router();
const { validateProperty } = require('./property.validator');
const validateRequest = require('../middleware/validateRequest');
const {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
  } = require('./property.controller');




// Example auth middleware (replace with your actual middleware)
const { authenticate } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

// Public Routes
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// Admin-only Routes
router.post('/', authenticate, allowRoles('admin'), validateProperty, validateRequest, createProperty);
router.patch('/:id', authenticate, allowRoles('admin'), updateProperty);
router.delete('/:id', authenticate, allowRoles('admin'), deleteProperty);

module.exports = router;


