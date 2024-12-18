const express = require("express");
const { eventController } = require("../../controllers");
const router = express.Router();
const multer = require("multer");
const { Authentication, Authorization } = require("../../middlewares");

//Save
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
      // cb(null, file.originalname + "-" + Date.now() + ".jpg")
    },
  }),
}).fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  // Add more fields if needed based on the expected number of gallery images
]);

//View
router.get("/event-list", Authentication, Authorization, eventController.getEvents);
router.get(
  "/event-list/:id",
  Authentication,
  Authorization,
  eventController.getEventById
);
router.get(
  "/search-event-list",
  Authentication,
  Authorization,
  eventController.searchEvents
);
//Create
router.post(
  "/basicinfo/create-event",
  Authentication,
  Authorization,
  eventController.addBasicInfo
);
router.patch(
  "/packege/create-event/:eventId",
  Authentication,
  Authorization,
  eventController.addPackageInfo
);
router.patch(
  "/media/create-event/:eventId",
  Authentication,
  Authorization,
  upload,
  eventController.addMedia
);
router.patch(
  "/speakerlist/create-event/:eventId",
  Authentication,
  Authorization,
  eventController.addSpeaker
);
router.patch(
  "/domain/create-event/:eventId",
  Authentication,
  Authorization,
  eventController.addDomainInfo
);
router.patch(
  "/social/create-event/:eventId",
  Authentication,
  Authorization,
  eventController.addSocial
);
//Update
router.put(
  "/basicinfo/edit-event/:id",
  Authentication,
  Authorization,
  eventController.updateBasicinfo
);
router.put(
  "/packege/edit-event/:id",
  Authentication,
  Authorization,
  eventController.updatePeckageInfo
);
router.put(
  "/media/edit-event/:id",
  upload,
  Authentication,
  Authorization,
  eventController.updateMedia
);
router.put(
  "/speakerlist/edit-event/:id",
  Authentication,
  Authorization,
  eventController.updateSpeakerInfo
);
router.put(
  "/domain/edit-event/:id",
  Authentication,
  Authorization,
  eventController.updateDomain
);
router.put(
  "/social/edit-event/:id",
  Authentication,
  Authorization,
  eventController.updateSocial
);
//Delete

module.exports = router;












