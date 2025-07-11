const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      default: 1
    },
    area: {
      type: Number,
      default: 0 // in square feet or meters
    },
    propertyType: {
      type: String,
      enum: ['apartment', 'house', 'villa', 'commercial'],
      default: 'apartment'
    },
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    images: {
      type: [String], // list of image URLs
      default: []
    }
  },
  { timestamps: true }
); 


const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
