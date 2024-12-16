const { Permission } = require("../models");

const getPermission = async (roomCategoryData) => {
  try {
    const permission = Permission.find()
    return permission
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};
const createPermission = async (permissions) => {

  try {
    const permission = Permission.create(permissions)
    return permission
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};


module.exports = {
    getPermission,createPermission
};
