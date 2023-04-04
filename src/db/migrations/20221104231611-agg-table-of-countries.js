"use strict";

const {
  CountriesSchema,
  COUNTRIES_TABLE,
} = require("./../models/countries.model");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(COUNTRIES_TABLE, CountriesSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(COUNTRIES_TABLE);
  },
};
