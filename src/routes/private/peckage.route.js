const express = require('express');
const router = express.Router();
const  {PeckageType}  = require('../../models');

// Create a new package type
router.post('/create', async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const newPeckage = await PeckageType.create({ name, description, isActive });
    res.status(201).json({ success: true, data: newPeckage });
  } catch (error) {
    console.error('Error creating package type:', error);
    res.status(500).json({ success: false, message: 'Failed to create package type', error });
  }
});

// Read all package types
router.get('/get', async (req, res) => {
  try {
    const packages = await PeckageType.find();
    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    console.error('Error fetching package types:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch package types', error });
  }
});

// Read a specific package type by ID
router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const peckage = await PeckageType.findById(id);
    if (!peckage) {
      return res.status(404).json({ success: false, message: 'Package type not found' });
    }
    res.status(200).json({ success: true, data: peckage });
  } catch (error) {
    console.error('Error fetching package type:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch package type', error });
  }
});

// Update a package type by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;
    const updatedPeckage = await PeckageType.findByIdAndUpdate(
      id,
      { name, description, isActive },
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );
    if (!updatedPeckage) {
      return res.status(404).json({ success: false, message: 'Package type not found' });
    }
    res.status(200).json({ success: true, data: updatedPeckage });
  } catch (error) {
    console.error('Error updating package type:', error);
    res.status(500).json({ success: false, message: 'Failed to update package type', error });
  }
});

// Delete a package type by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPeckage = await PeckageType.findByIdAndDelete(id);
    if (!deletedPeckage) {
      return res.status(404).json({ success: false, message: 'Package type not found' });
    }
    res.status(200).json({ success: true, message: 'Package type deleted successfully' });
  } catch (error) {
    console.error('Error deleting package type:', error);
    res.status(500).json({ success: false, message: 'Failed to delete package type', error });
  }
});

module.exports = router;
