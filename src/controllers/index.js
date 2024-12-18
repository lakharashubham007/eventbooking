
module.exports.roleController = require('./role.controller.js');

//AdminStaff

module.exports.createAdminStaff = require("./adminStaff.controller").createAdminStaff;
module.exports.deleteAdminStaff = require("./adminStaff.controller").deleteAdminStaff;
module.exports.getAdminStaffById = require("./adminStaff.controller").getAdminStaffById;
module.exports.updateAdminStaff = require("./adminStaff.controller").updateAdminStaff;
module.exports.getAllAdminStaff = require("./adminStaff.controller").getAllAdminStaff;
module.exports.permissionController = require('./permission.controller.js');

//Events
module.exports.eventController = require('./events.controller');
module.exports.eventTypeController = require('./eventType.controller');