const mongoose = require('mongoose');

// Event Schema

const eventSchema = new mongoose.Schema({
  event_title: { type: String, default: null },
  event_type: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType', default: null },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  logo: { type: String, default: null },
  banner: { type: String, default: null },
  start_date: { type: Date, default: null },
  end_date: { type: Date, default: null },
  website_link: { type: String, default: null },
  facebook: { type: String, default: null },
  linkedin: { type: String, default: null },
  instagram: { type: String, default: null },
  twitter: { type: String, default: null },
  youtube: { type: String, default: null },
  about_event: { type: String, default: null },
  why_to_support_event: { type: String, default: null },
  brand_versatile: { type: String, default: null },
  start_time: { type: String, default: null },
  contact_number: { type: String, default: null },
  email: { type: String, default: null },
  country_code: { type: Number, default: null },
  is_active: { type: Boolean, default: false },
  description: { type: String, default: null },
  end_time: { type: String, default: null },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  address: { type: String, default: null },
  pin_code: { type: String, default: null },
  country: { type: String, default: null },
  country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', default: null },
  state: { type: String, default: null },
  state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'State', default: null },
  city: { type: String, default: null },
  city_id: { type: mongoose.Schema.Types.ObjectId, ref: 'City', default: null },
  event_status: { type: String, default: 'Draft' },
  published: { type: Boolean, default: false },
  unpublished: { type: Boolean, default: true },
  published_date: { type: Date, default: null },
  published_end_date: { type: Date, default: null },
  published_start_time: { type: String, default: null },
  published_end_time: { type: String, default: null },
  status: { type: String, default: null },
  event_mode: { type: String, default: null },
  event_time_category: { type: String, default: null },
  views: { type: Number, default: 0 },
  no_of_participants: { type: Number, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  address_type: { type: String, default: null },
  landmark: { type: String, default: null },
  archive: { type: Boolean, default: false },
  
});



const Event= mongoose.model('Event', eventSchema);

module.exports = Event;
