const express = require("express");
const usersRouter = require("./users.router");
const propertyRouter = require("./property.router");
const countriesRoutero = require("./countries.router");
const authRouter = require("./auth.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/properties", propertyRouter);
  router.use("/countries", countriesRoutero);
  router.use("/auth", authRouter);
}

module.exports = routerApi;
