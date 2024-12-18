const express = require("express");
const { eventTypeController } = require("../../controllers");
const router = express.Router();
const { Authentication, Authorization } = require("../../middlewares");




// GET: Retrieve all event types
router.get("/event-type", eventTypeController.getEventType);

// POST: Create a new event type
router.post(
  "/create-event-type",
  Authentication,
  Authorization,
  eventTypeController.createEventType
);

// POST: Update an existing event type
router.post(
  "/update-event-type",
  Authentication,
  Authorization,
  eventTypeController.updateEventType
);

// POST: Delete an event type
router.post(
  "/delete-event-type",
  Authentication,
  Authorization,
  eventTypeController.deleteEventType
);


module.exports = router;


