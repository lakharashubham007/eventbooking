const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Under Review", "Approved", "Rejected", "Completed", "Cancelled"],
      default: "Draft",
    },
    ticketTypes: [
      {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        availableQuantity: { type: Number, required: true },
      },
    ],
    media: [
      {
        type: String,
        trim: true,
      },
    ],
    schedule: [
      {
        time: { type: String, trim: true },
        description: { type: String, trim: true },
      },
    ],
    speakers: [
      {
        name: { type: String, trim: true },
        photo: { type: String, trim: true },
        designation: { type: String, trim: true },
      },
    ],
    customDomain: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports.Event = Event;
