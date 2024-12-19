const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const {Event} = require("../models");

// Service functions for Event Management

const getEvents = async () => {
  return await Event.find();
};

const createEvent = async (eventData) => {
  const event = await Event.create(eventData);
  return event;
};

const getEventById = async (id) => {
  const event = await Event.findById(id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  return event;
};

const addBasicInfo = async (basicInfoData) => {
  try {
    // Check if an event with the same title exists
    const existingEvent = await Event.findOne({ event_title: basicInfoData.event_title });
    if (existingEvent) {
      return { success: false, addbasicInfo: existingEvent };
    }

    // Create a new event
    const event = await Event.create(basicInfoData);
    return { created: true, addbasicInfo: event };
  } catch (error) {
    console.error("Error in addBasicInfo:", error);
    throw error;
  }
};


const addPeckageInfo = async (eventId, packageData) => {
  try {
    console.log(packageData, "---------------peckages---------------");

    // Find the event by ID
    let event = await Event.findById(eventId);
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
    }

    // Update the event's package-related fields
    event.peckage_type = packageData.peckage_type || event.peckage_type;
    event.peckage_amount = packageData.peckage_amount || event.peckage_amount;
    event.peckage_start_date = packageData.peckage_start_date || event.peckage_start_date;
    event.peckage_description = packageData.peckage_description || event.peckage_description;
    event.currency = packageData.currency || event.currency;

    // Save the updated event
    await event.save();

    console.log(event, "---------------event---------------");
    return { created: true,  event };
  } catch (error) {
    console.error("Error adding package info:", error);
    throw error;
  }
};


const addMedia = async ({ eventId, thumbnail, gallery }) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }

  event.media = {
    thumbnail: thumbnail.path,
    gallery: gallery.map(file => file.path),
  };

  await event.save();
  return { success: true, media: event.media };
};

const addSpeaker = async (eventId, speakerData) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  event.speakers.push(speakerData);
  await event.save();
  return { hotel: event, statusCode: httpStatus.OK };
};

const updateBasicinfo = async (id, updateData) => {
  const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedEvent) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  return updatedEvent;
};

const updatePeckageInfo = async (id, packageData) => {
  const updatedEvent = await Event.findByIdAndUpdate(id, { packageInfo: packageData }, { new: true });
  if (!updatedEvent) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  return updatedEvent;
};

const updateMedia = async ({ id, thumbnail, gallery }) => {
  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    {
      media: {
        thumbnail: thumbnail.path,
        gallery: gallery.map(file => file.path),
      },
    },
    { new: true }
  );

  if (!updatedEvent) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  return { success: true, media: updatedEvent.media };
};

const suggestions = async (id, suggestionData) => {
  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { $push: { suggestions: suggestionData } },
    { new: true }
  );

  if (!updatedEvent) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  return updatedEvent;
};

module.exports = {
  getEvents,
  createEvent,
  getEventById,
  addBasicInfo,
  addPeckageInfo,
  addMedia,
  addSpeaker,
  updateBasicinfo,
  updatePeckageInfo,
  updateMedia,
  suggestions,
};
