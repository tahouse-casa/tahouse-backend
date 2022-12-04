"use strict";
const { COUNTRIES_TABLE } = require("../models/countries.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(COUNTRIES_TABLE, "citys", {
      allowNull: false,
      type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
      defaultValue: [""],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(COUNTRIES_TABLE, "citys");
  },
};
