"use strict";

const { UserSchema, USER_TABLE } = require("./../models/user.model");
const {
  PROPERTY_TABLE,
  PropertySchema,
} = require("./../models/property.model");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PROPERTY_TABLE, PropertySchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PROPERTY_TABLE);
  },
};
