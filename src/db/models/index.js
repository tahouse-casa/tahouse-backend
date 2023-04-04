const { User, UserSchema } = require("./user.model");
const { Property, PropertySchema } = require("./property.model");
const { Countries, CountriesSchema } = require("./countries.model");
const { Favorites, FavoritesSchema } = require("./favorites.model");
const { Featured, FeaturedSchema } = require("./featured.model");


function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Property.init(PropertySchema, Property.config(sequelize));
  Countries.init(CountriesSchema, Countries.config(sequelize));
  Favorites.init(FavoritesSchema, Favorites.config(sequelize));
  Featured.init(FeaturedSchema, Featured.config(sequelize));

  Property.associate(sequelize.models);
  User.associate(sequelize.models);
  Featured.associate(sequelize.models);
  Favorites.associate(sequelize.models);
}

module.exports = setUpModels;
