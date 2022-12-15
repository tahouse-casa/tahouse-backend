"use strict";

const {
  FavoritesSchema,
  FAVORITES_TABLE,
} = require("./../models/favorites.model");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(FAVORITES_TABLE, FavoritesSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(FAVORITES_TABLE);
  },
};
