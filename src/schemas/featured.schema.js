const Joi = require("joi");

const id = Joi.number().integer();
const propertyId = Joi.number().integer();

const getFeaturedSchema = Joi.object({
  id: id.required(),
});

const createFeaturedSchema = Joi.object({
  propertyId: propertyId.required(),
});


module.exports = { getFeaturedSchema, createFeaturedSchema };
