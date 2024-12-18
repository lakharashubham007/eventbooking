const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { eventService } = require("../service");


const getEvents = async (req, res) => {
  try {
    const getHotels = await eventService.getEvents();
    res.json({ success: true, hotels: getHotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const addBasicInfo = catchAsync(async (req, res) => {
  const { created, addbasicInfo } = await eventService.addBasicInfo(req.body);
  if (created) {
    res.status(httpStatus.CREATED).send({ basicInfo: addbasicInfo, message: "Basic Information Saved Successfully!" });
  } else {
    res.status(httpStatus.OK).send({ basicInfo: addbasicInfo, message: "Existing Hotel Details!" });
  }
});


const addPackageInfo = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  const locationInfo = req.body;
  console.log(locationInfo)
  try {
    const { hotel, statusCode } = await eventService.addPeckageInfo(eventId, locationInfo);
    res.status(statusCode).json({
      success: true,
      hotel: hotel,
      message: `Location Info ${statusCode === 200 ? 'Saved' : 'Already Up to Date'} Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


const addMedia = async (req, res, next) => {
  try {

    const { eventId } = req.params;
    const thumbnail = req.files.thumbnail; // Assuming the thumbnail is a single file

    // Extract gallery files from req.files array
    const gallery = req.files.gallery.filter(file => file.fieldname.startsWith('gallery'));

    // Call the service to handle the addition of media
    const result = await eventService.addMedia({ eventId, thumbnail, gallery });

    // Respond with the result
    res.status(201).json(result);
  } catch (error) {
    console.error("Error in addMedia controller:", error);
    next(error);
  }
};


const addSpeaker = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  const propertyRulesInfo = req.body;
  const paymentMethods = req.body.paymentMethods;
  try {
    const { hotel, statusCode } = await eventService.addSpeaker(eventId, propertyRulesInfo, paymentMethods);
    res.status(statusCode).json({
      success: true,
      hotel: hotel,
      message: `Property Rules Info ${statusCode === 200 ? 'Saved' : 'Already Up to Date'} Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


const addDomainInfo = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  const facilities = req.body.facilities;
  try {
    const { hotel, statusCode } = await eventService.addDomainInfo(eventId, facilities);
    res.status(statusCode).json({
      success: true,
      hotel: hotel,
      message: `Facilities Info ${statusCode === 200 ? 'Added' : 'Already Up to Date'} Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
const addSocial = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  const facilities = req.body.facilities;
  try {
    const { hotel, statusCode } = await eventService.addSocial(eventId, facilities);
    res.status(statusCode).json({
      success: true,
      hotel: hotel,
      message: `Facilities Info ${statusCode === 200 ? 'Added' : 'Already Up to Date'} Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});





const createEvent = catchAsync(async (req, res) => {
  const hotel = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send({ hotel });
});

const getEventById = async (req, res) => {
  const { city } = req.body; // Assuming the ID is passed in the URL parameters
 const {id}=req.params
  try {
    const hotel = await eventService.getEventById(id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }
    res.json({ success: true, hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const searchEvents = async (req, res) => {
  const { location, to_date, from_date, guest, room_count } = req.body;
  console.log(location,to_date, from_date, guest, room_count , "-----------====================");
  try {
    const hotel = await eventService.searchEvents(
      location.toLowerCase(),
      to_date,
      from_date,
      guest,
      room_count
    );
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }
    res.status(200).json({ success: true, data:hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update existing hotel basic info by ID
const updateBasicinfo = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(updateData,"-------------updatedHotel-----------")

  try {
    const updatedHotel = await eventService.updateBasicinfo(id, updateData);
    res.json({ success: true, updatedHotel });
  } catch (error) {
    console.error('Error updating hotel basic info:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update location information by ID
const updatePeckageInfo = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedHotel = await eventService.updatePeckageInfo(id, updateData);
    res.json({ success: true, updatedHotel });
  } catch (error) {
    console.error('Error updating hotel location info:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update media for a specific hotel by ID
const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { thumbnail, gallery } = req.files;

    // Call the service to handle the media update
    const result = await eventService.updateMedia({ id, thumbnail, gallery });

    // Respond with the result
    res.json(result);
  } catch (error) {
    console.error("Error in updateMedia controller:", error);
    next(error);
  }
};

const updateSpeakerInfo = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedInfo = await eventService.updateSpeakerInfo(id, updateData);
    res.json({ success: true, updatedInfo });
  } catch (error) {
    console.error('Error updating property rules info:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Update hotel facilities for a specific hotel by ID
const updateDomain = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedFacilities = await eventService.updateDomain(id, updateData);
    res.json({ success: true, updatedFacilities });
  } catch (error) {
    console.error('Error updating hotel facilities:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const suggestions = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedFacilities = await eventService.suggestions(id, updateData);
    res.json({ success: true, updatedFacilities });
  } catch (error) {
    console.error('Error updating hotel facilities:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const updateSocial = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedFacilities = await eventService.updateSocial(id, updateData);
    res.json({ success: true, updatedFacilities });
  } catch (error) {
    console.error('Error updating hotel facilities:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




module.exports = {
  createEvent,
  addBasicInfo,
  addPackageInfo,
  addMedia,
  addSpeaker,
  addDomainInfo,
  getEvents,
  addSocial,
  getEventById,
  updateBasicinfo,
  updateSpeakerInfo,
  updateMedia,
  updateDomain,
  updateSocial,
  searchEvents,
  suggestions,
  updatePeckageInfo
};