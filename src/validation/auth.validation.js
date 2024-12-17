const Joi = require("joi");
const { password } = require("./custom.validation");

/**
 * Validation schema for user registration.
 */
const register = {
  body: Joi.object().keys({
    username: Joi.string().required().min(3).max(50),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    role: Joi.string(), // Assuming role is a string for simplicity
    password: Joi.string().required().custom(password).min(8),
    email: Joi.string().required().email().trim(),
    phone: Joi.string()
      .pattern(/^\+?(?:[0-9] ?){6,14}[0-9]$/)
      .trim(),
    profile_picture: Joi.any().optional(),
    address: Joi.string().required().max(200),
    city: Joi.string().required().max(30),
    state: Joi.string().required().max(30),
    zipcode: Joi.string().required().max(7),
    pan_number: Joi.string().required().max(10).uppercase(),
    aadhar_number: Joi.number().required().min(12),
  }),
};

/**
 * Validation schema for user login.
 */
const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
