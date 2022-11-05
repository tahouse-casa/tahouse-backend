const Joi = require("joi");

const id = Joi.number().integer();
const country = Joi.string().min(2);
const latitud = Joi.number();
const longitud = Joi.number();

const createCountrysSchema = Joi.object({
  latitud: latitud.required(),
  longitud: longitud.required(),
  country: country.required(),
});

const updateCountrySchema = Joi.object({
  country: country,
  latitud: latitud,
  longitud: longitud,
});

const getCountrySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  getCountrySchema,
  updateCountrySchema,
  createCountrysSchema,
};
