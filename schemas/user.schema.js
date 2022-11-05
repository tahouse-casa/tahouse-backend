const Joi = require("joi");

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6).max(20);
const phone = Joi.number().integer().min(10);
const name = Joi.string().min(5);
const city = Joi.string().min(3);
const country = Joi.string().min(4);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  phone: phone.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password.required(),
  phone: phone,
  name: name,
  city: city,
  country: country,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
