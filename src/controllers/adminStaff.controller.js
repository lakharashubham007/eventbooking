const {AdminStaff, User} = require("../models");
const bcrypt = require("bcryptjs");

/**
 * Create a new admin staff
 */

const createAdminStaff = async (req, res) => {
  console.log(req.file, "---------------createAdminStaff---------------");
  if(!req.file){
    res.status(400).send({ message: "Profile Picture is required" });
  }
  try {
    const { firstname, lastname, email, phone, password, username } = req.body;

    // Check if the user already exists
    const isUserAlreadyExist = await User.findOne({
      $or:[{email},{phone}]
    });
    if (isUserAlreadyExist) {
      return res.status(400).json({ message: "A user with this email already exists." });
    }

    

    // Create a new admin staff user
    const newAdminStaff = new User({
      username,
      firstname,
      lastname,
      email,
      phone,
      role: "675abe36c43c6973f28d34bd", // Role ID for admin staff
      password,
      profile_picture,
    });

    // Save the new user
    await newAdminStaff.save();

    return res.status(201).json({ 
      message: "Admin staff created successfully.", 
      adminStaff: {
        id: newAdminStaff._id,
        firstname: newAdminStaff.firstname,
        lastname: newAdminStaff.lastname,
        email: newAdminStaff.email,
        phone: newAdminStaff.phone,
        role: newAdminStaff.role,
        profile_picture: newAdminStaff.profile_picture,
      }
    });
  } catch (error) {
    console.error("Error creating admin staff:", error);
    return res.status(500).json({ 
      message: "Error creating admin staff.", 
      error: error.message || error 
    });
  }
};
/**
 * Get all admin staff
 */
const getAllAdminStaff = async (req, res) => {
  try {
    const adminStaffList = await AdminStaff.find().populate("adminId role");
    return res.status(200).json(adminStaffList);
  } catch (error) {
    return res.status(400).json({ message: "Error fetching admin staff.", error });
  }
};

/**
 * Get a specific admin staff by ID
 */
const getAdminStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminStaff = await AdminStaff.findById(id).populate("adminId role");

    if (!adminStaff) return res.status(404).json({ message: "Admin staff not found." });

    return res.status(200).json(adminStaff);
  } catch (error) {
    return res.status(400).json({ message: "Error fetching admin staff.", error });
  }
};

/**
 * Update an admin staff by ID
 */
const updateAdminStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Hash the password if it's being updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedAdminStaff = await AdminStaff.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedAdminStaff) return res.status(404).json({ message: "Admin staff not found." });

    return res.status(200).json({ message: "Admin staff updated successfully.", adminStaff: updatedAdminStaff });
  } catch (error) {
    return res.status(400).json({ message: "Error updating admin staff.", error });
  }
};

/**
 * Delete an admin staff by ID
 */
const deleteAdminStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdminStaff = await AdminStaff.findByIdAndDelete(id);
    if (!deletedAdminStaff) return res.status(404).json({ message: "Admin staff not found." });

    return res.status(200).json({ message: "Admin staff deleted successfully." });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting admin staff.", error });
  }
};

module.exports = {
  createAdminStaff,
  getAllAdminStaff,
  getAdminStaffById,
  updateAdminStaff,
  deleteAdminStaff,
};