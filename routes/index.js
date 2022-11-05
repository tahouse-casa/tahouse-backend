const express = require("express");
const usersRouter = require("./users.router");
const propertyRouter = require("./property.router");
const countriesRoutero = require("./countries.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/properties", propertyRouter);
  router.use("/countries", countriesRoutero);
}

module.exports = routerApi;
