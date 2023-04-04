"use strict";
const { PROPERTY_TABLE } = require("../models/property.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(PROPERTY_TABLE, "type_operation", {
      field: "type_operation",
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      defaultValue: "Alquiler",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(PROPERTY_TABLE, "type_operation");
  },
};
