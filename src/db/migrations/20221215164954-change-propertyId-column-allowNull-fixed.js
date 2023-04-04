"use strict";
const { DataTypes } = require("sequelize");

const { FAVORITES_TABLE } = require("./../models/favorites.model");

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(FAVORITES_TABLE, "property_id", {
      field: "property_id",
      allowNull: true,
      unique: false,
      type: DataTypes.INTEGER,
    });
  },

  async down(queryInterface) {
    //await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
