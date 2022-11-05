const { User, UserSchema } = require("./user.model");
const { Property, PropertySchema } = require("./property.model");
const { Countries, CountriesSchema } = require("./countries.model");

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Property.init(PropertySchema, Property.config(sequelize));
  Countries.init(CountriesSchema, Countries.config(sequelize));
}

module.exports = setUpModels;
