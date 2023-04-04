"use strict";
const { PROPERTY_TABLE } = require("../models/property.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(PROPERTY_TABLE, "environments", {
      field: "environments",
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 1,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(PROPERTY_TABLE, "environments");
  },
};
