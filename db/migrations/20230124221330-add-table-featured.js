"use strict";

const {
  FeaturedSchema,
  FEATURED_TABLE,
} = require("./../models/featured.model");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(FEATURED_TABLE, FeaturedSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(FEATURED_TABLE);
  },
};

