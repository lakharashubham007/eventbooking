const express = require("express");
const authRoute = require("./auth.route");

const roles = require("./role.route");
const sidebarmenu = require("./sidebarMenu.route");
const permission = require("./permission.route.js");
const adminstaff = require("./adminStaffRoutes.js");
const events = require("./events.js");
const router = express.Router();

//Task: Reroute all API requests beginning with the `/v2` route to Express router in auth.route.js
router.use("/auth", authRoute);


router.use("/roles", roles);
router.use('/admin_staff',adminstaff)
router.use("/sidemenu", sidebarmenu);
router.use("/permission", permission);
router.use("/events", events);

module.exports = router;