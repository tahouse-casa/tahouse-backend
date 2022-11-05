const Joi = require("joi");

const id = Joi.number().integer();
const city = Joi.string().min(3);
const country = Joi.string().min(4);
const meters = Joi.number().integer().min(2);
const rooms = Joi.number().integer();
const bathrooms = Joi.number().integer();
const description = Joi.string().min(10);
const price = Joi.number().integer().min(2);
const address = Joi.string();
const state = Joi.string();
const type = Joi.string();
const urlImage = Joi.array().items(Joi.string());

const createPropertySchema = Joi.object({
  city: city.required(),
  price: price.required(),
  country: country.required(),
  meters: meters.required(),
  rooms: rooms.required(),
  bathrooms: bathrooms.required(),
  description: description.required(),
  address: address.required(),
  state: state,
  type: type.required(),
  urlImage: urlImage.required(),
});

const updatePropertySchema = Joi.object({
  city: city,
  country: country,
  meters: meters,
  rooms: rooms,
  bathrooms: bathrooms,
  description: description,
  address: address,
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
