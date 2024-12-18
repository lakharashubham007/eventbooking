const { EventType } = require("../models");

// GET: Retrieve all event types
const getEventType = async (req, res) => {
  try {
    const eventTypes = await EventType.find();
    res.status(200).json(eventTypes);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve event types", error });
  }
};

// POST: Create a new event type
const createEventType = async (req, res) => {
  try {
    const { type, description } = req.body;
console.log(req.body, "---------------req.body---------------");
    // Check if event type already exists
    const existingEventType = await EventType.findOne({  type });
    if (existingEventType) {
      return res.status(400).json({ message: "Event type already exists" });
    }

    const newEventType = new EventType({ type, description });
    await newEventType.save();

    res.status(201).json({ message: "Event type created successfully", newEventType });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event type", error });
  }
};

// POST: Update an existing event type
const updateEventType = async (req, res) => {
  try {
    const { id, type, description, is_active } = req.body;

    const updatedEventType = await EventType.findByIdAndUpdate(
      id,
      { type, description, is_active },
      { new: true, runValidators: true }
    );

    if (!updatedEventType) {
      return res.status(404).json({ message: "Event type not found" });
    }

    res.status(200).json({ message: "Event type updated successfully", updatedEventType });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event type", error });
  }
};

// POST: Delete an event type
const deleteEventType = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedEventType = await EventType.findByIdAndDelete(id);

    if (!deletedEventType) {
      return res.status(404).json({ message: "Event type not found" });
    }

    res.status(200).json({ message: "Event type deleted successfully", deletedEventType });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event type", error });
  }
};
module.exports={deleteEventType,createEventType,getEventType,updateEventType}