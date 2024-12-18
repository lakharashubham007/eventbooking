// const express = require("express");
// const {
//   createAdminStaff,
//   getAllAdminStaff,
//   getAdminStaffById,
//   updateAdminStaff,
//   deleteAdminStaff,
// } = require("../../controllers");
// const { Authentication, Authorization,checkEmailAndPhone } = require("../../middlewares");
// const validate = require("../../middlewares/validate");
// const authValidation = require("../../validation/auth.validation");
// const upload = require("../../middlewares/multer");

// const router = express.Router();

// // CRUD routes for admin staff
// router.post("/create-admin-staff", Authentication,Authorization,upload.single("profile_picture"),checkEmailAndPhone,createAdminStaff);
// router.get("/view-admin-staff", getAllAdminStaff);
// router.get("/view-admin-staff/:id", getAdminStaffById);
// router.put("/admin-staff/:id", updateAdminStaff);
// router.delete("/delete-admin-staff/:id", deleteAdminStaff);

// module.exports = router;

const express = require("express");
const {
  createAdminStaff,
  getAllAdminStaff,
  getAdminStaffById,
  updateAdminStaff,
  deleteAdminStaff,
} = require("../../controllers/adminStaff.controller");
const authValidation = require("../../validation/auth.validation");
const {
  Authentication,
  Authorization,
  checkEmailAndPhone,
} = require("../../middlewares");
const upload = require("../../middlewares/multer");
const { authService } = require("../../service");
const validate = require("../../middlewares/validate");

const router = express.Router();

const uploadMiddleware = upload.fields([
  { name: "profile_picture", maxCount: 1 },
  { name: "aadhar_front", maxCount: 1 },
  { name: "aadhar_back", maxCount: 1 },
  { name: "pan_front", maxCount: 1 },
]);

router.post(
  "/create-admin-staff",
  Authentication,
  Authorization,
  uploadMiddleware,
  checkEmailAndPhone,
  validate(authValidation.register),
  createAdminStaff
);

router.get("/get-admin-staff", Authentication, Authorization, getAllAdminStaff);
router.get(
  "/get-admin-staff/:id",
  Authentication,
  Authorization,
  getAdminStaffById
);
router.post(
  "/update-admin-staff/:id",
  Authentication,
  Authorization,
  uploadMiddleware,
  validate(authValidation.register),
  updateAdminStaff
);
router.delete(
  "/delete-admin-staff/:id",
  Authentication,
  Authorization,
  deleteAdminStaff
);

module.exports = router;
