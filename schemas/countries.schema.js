const Joi = require("joi");

const id = Joi.number().integer();
const country = Joi.string().min(2).max(30);
const latitud = Joi.number();
const longitud = Joi.number();
const citys = Joi.array().items(Joi.string().max(30));

const createCountrysSchema = Joi.object({
  latitud: latitud.required(),
  longitud: longitud.required(),
  country: country.required(),
  citys: citys.required(),
});

const updateCountrySchema = Joi.object({
  country: country,
  latitud: latitud,
  longitud: longitud,
  citys: citys,
});

const getCountrySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  getCountrySchema,
  updateCountrySchema,
  createCountrysSchema,
};
