//adminStaff
module.exports.AdminStaff = require('./adminStaff.model').AdminStaff


//Database Schema
module.exports.User = require('./user.model').User
module.exports.Role = require('./role.model').Role
module.exports.SidebarMenu = require('./sidebarMenu.model').SidebarMenu
module.exports.Permission = require('./permission.model').Permission


//Events
module.exports.Event = require('./event.model').Event;
// module.exports.EventPackage = require('./eventPackage.model').EventPackage;
// module.exports.EventTag = require('./eventTag.model.js').EventTag;
module.exports.EventBanner = require('./eventBanner.model').EventBanner;
// module.exports.EventGallery = require('./eventGallery.model.js').EventGallery;
// module.exports.EventHashtags = require('./eventHashtags.model.js').EventHashtags;
// module.exports.EventLanguages = require('./eventLanguages.model').EventLanguages;
// module.exports.EventMode = require('./eventMode.model').EventMode;
// module.exports.EventPackageCoupons = require('./eventPackageCoupons.model').EventPackageCoupons;
// module.exports.EventPartnership = require('./eventPartnership.model').EventPartnership;
// module.exports.EventReference = require('./eventReference.model').EventReference;
// module.exports.EventSchedule = require('./eventSchedule.model').EventSchedule;
// module.exports.EventScheduleUploadDocument = require('./eventScheduleUploadDocument.model').EventScheduleUploadDocument;
// module.exports.EventSponsorDetails = require('./eventSponsorDetails.model').EventSponsorDetails;
// module.exports.EventTimeCategory = require('./eventTimeCategory.model').EventTimeCategory;
module.exports.EventType = require('./eventType.model.js').EventType;
