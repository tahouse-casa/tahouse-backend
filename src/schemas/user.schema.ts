const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6).max(20);
const phone = Joi.string().min(10);
const name = Joi.string().min(5);
const city = Joi.string().min(3);
const role = Joi.string();
const country = Joi.string().min(4);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  phone: phone,
  role: role,
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  phone: phone,
  name: name,
  city: city,
  country: country,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

export { createUserSchema, updateUserSchema, getUserSchema };
