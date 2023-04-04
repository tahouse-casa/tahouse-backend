"use strict";
const { PROPERTY_TABLE } = require("../models/property.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(PROPERTY_TABLE, "phone", {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      defaultValue: "3012905676",
    });
    await queryInterface.addColumn(PROPERTY_TABLE, "email", {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      defaultValue: "ideaBonplant@gmail.com",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(PROPERTY_TABLE, "phone");
    await queryInterface.removeColumn(PROPERTY_TABLE, "email");
  },
};
