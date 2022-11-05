"use strict";
const {
  PROPERTY_TABLE,
  PropertySchema,
} = require("./../models/property.model");

//** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(
      PROPERTY_TABLE,
      "state",
      PropertySchema.state
    );
    await queryInterface.addColumn(PROPERTY_TABLE, "type", PropertySchema.type);
    await queryInterface.addColumn(
      PROPERTY_TABLE,
      "url_image",
      PropertySchema.urlImage
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(PROPERTY_TABLE, "state");
    await queryInterface.removeColumn(PROPERTY_TABLE, "type");
    await queryInterface.removeColumn(PROPERTY_TABLE, "url_image");
  },
};
