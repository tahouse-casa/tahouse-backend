const Joi = require("joi");

const id = Joi.number().integer();
const city = Joi.string().min(3).max(30);
const country = Joi.string().max(30);
const environments = Joi.number().integer();
const typeOperation = Joi.string().max(30);
const state = Joi.string().max(30);
const type = Joi.string().max(30);
const address = Joi.string().max(30);
const rooms = Joi.number().integer();
const bathrooms = Joi.number().integer();
const urlImage = Joi.array().items(Joi.string());
const price = Joi.number().integer().min(2);
const meters = Joi.number().integer().min(2);
const email = Joi.string().email();

const phone = Joi.string().min(10);
const description = Joi.string().min(10).max(30);

const createPropertySchema = Joi.object({
  city: city.required(),
  price: price.required(),
  country: country.required(),
  meters: meters.required(),
  rooms: rooms.required(),
  phone: phone.required(),
  email: email.required(),
  environments: environments.required(),
  bathrooms: bathrooms.required(),
  description: description.required(),
  address: address.required(),
  typeOperation: typeOperation.required(),
  state: state,
  type: type.required(),
  urlImage: urlImage.required(),
});

const updatePropertySchema = Joi.object({
  city: city,
  country: country,
  meters: meters,
  rooms: rooms,
  phone: phone,
  email: email,
  environments: environments,
  bathrooms: bathrooms,
  description: description,
  address: address,
  typeOperation: typeOperation,
  price: price,
  state: state,
  type: type,
  urlImage: urlImage,
});

const getPropertySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  getPropertySchema,
  updatePropertySchema,
  createPropertySchema,
};
