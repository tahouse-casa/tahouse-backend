const { User, UserSchema } = require("./user.model");
const { Property, PropertySchema } = require("./property.model");
const { Countries, CountriesSchema } = require("./countries.model");
const { Favorites, FavoritesSchema } = require("./favorites.model");

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Property.init(PropertySchema, Property.config(sequelize));
  Countries.init(CountriesSchema, Countries.config(sequelize));
  Favorites.init(FavoritesSchema, Favorites.config(sequelize));

  Property.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setUpModels;
