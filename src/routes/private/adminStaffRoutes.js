const express = require("express");
const {
  createAdminStaff,
  getAllAdminStaff,
  getAdminStaffById,
  updateAdminStaff,
  deleteAdminStaff,
} = require("../../controllers");
const { Authentication, Authorization,checkEmailAndPhone } = require("../../middlewares");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validation/auth.validation");
const upload = require("../../middlewares/multer");

const router = express.Router();

// CRUD routes for admin staff
router.post("/create-admin-staff", checkEmailAndPhone,upload.single("profile_picture"),);
router.get("/view-admin-staff", getAllAdminStaff);
router.get("/view-admin-staff/:id", getAdminStaffById);
router.put("/admin-staff/:id", updateAdminStaff);
router.delete("/delete-admin-staff/:id", deleteAdminStaff);

module.exports = router;