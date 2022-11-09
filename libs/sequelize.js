const { Sequelize } = require("sequelize");

const { config } = require("../config/config");
const setUpModels = require("../db/models");

const options = {
  dialect: "postgres",
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false,
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setUpModels(sequelize);
module.exports = sequelize;
