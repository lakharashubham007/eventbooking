const mongoose = require('mongoose');

// Define the PeckageType schema
const PeckageTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure package type names are unique
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Whether the package type is active
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the PeckageType model
const PeckageType = mongoose.model('PeckageType', PeckageTypeSchema);

module.exports.PeckageType = PeckageType
