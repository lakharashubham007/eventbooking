const express = require("express");

// const imageRoute = require('./images.route');
// const publicAuth = require('./publicAuth.route')
// const hotelRoute = require('./hotel.route')
// const roomRoute = require('./room.route')
// const commonRoute = require('./common.route')

const router = express.Router();

//Task: Reroute all API requests beginning with the `/v2` route to Express router in auth.route.js

// router.use("/get-Images", imageRoute);
// router.use("/auth-customer",  publicAuth);
// router.use("/hotels/",hotelRoute),
// router.use("/room", roomRoute),
// router.use("/public", commonRoute)

module.exports = router;