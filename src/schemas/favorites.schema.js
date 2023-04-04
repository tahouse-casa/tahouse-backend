const Joi = require("joi");

const id = Joi.number().integer();
const propertyId = Joi.number().integer();
const userId = Joi.number().integer();

const getFavoriteSchema = Joi.object({
  id: id.required(),
});

const createFavoriteSchema = Joi.object({
  propertyId: propertyId.required(),
  userId: userId.required(),
});

module.exports = { getFavoriteSchema, createFavoriteSchema };
