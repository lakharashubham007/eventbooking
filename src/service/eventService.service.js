const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const Event = require("../models");

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
  const existingEvent = await Event.findOne({ name: basicInfoData.name });
  if (existingEvent) {
    return { created: false, addbasicInfo: existingEvent };
  }
  const event = await Event.create(basicInfoData);
  return { created: true, addbasicInfo: event };
};

const addPeckageInfo = async (eventId, packageData) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  event.packageInfo = packageData;
  await event.save();
  return { hotel: event, statusCode: httpStatus.OK };
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
