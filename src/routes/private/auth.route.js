const express = require("express");
const router = express.Router();
const multer = require("multer");
const validate = require('../../middlewares/validate')
const authValidation = require("../../validation/auth.validation");
const authController = require("../../controllers/auth.controller.js");
const upload = require("../../middlewares/multer.js");




router.post(
    "/register",
    upload.single("profile_picture"), 
    validate(authValidation.register),
    authController.register
  );
  
// router.post("/register",validate(authValidation.register) , authController.register );
router.post("/login",validate(authValidation.login), authController.login);
router.post("/logout", authController.logout);


module.exports = router;