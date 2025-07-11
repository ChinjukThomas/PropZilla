const Property = require('./property.model');

// Create a new property
const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      listedBy: req.user._id,
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all properties (with filters and pagination)
const getProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, bedrooms, page = 1, limit = 10 } = req.query;
    const filters = { };
    
    if (location) filters.location = { $regex: location, $options: 'i' };
    if (bedrooms) filters.bedrooms = bedrooms;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = minPrice;
      if (maxPrice) filters.price.$lte = maxPrice;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(filters).skip(skip).limit(Number(limit));
    const total = await Property.countDocuments(filters);

    res.json({
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: Check if the property exists first
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Optional: Authorization check — only admin or property owner can update
    if (
      req.user.role !== 'admin' &&
      existingProperty.listedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Unauthorized to update this property' });
    }

    const updated = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: 'Property updated successfully',
      property: updated,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete property
const deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
