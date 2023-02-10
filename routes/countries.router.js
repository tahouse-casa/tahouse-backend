const express = require("express");
const CountriesService = require("./../services/countries.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  updateCountrySchema,
  createCountrysSchema,
  getCountrySchema,
} = require("./../schemas/countries.schema");
const passport = require("passport");
const { checkRoles } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new CountriesService();

router.get("/", async (req, res, next) => {
  try {
    const countries = await service.find();
    res.json(countries);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getCountrySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const country = await service.findOne(id);
      res.json(country);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(createCountrysSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCountry = await service.create(body);
      if (newCountry) {
        res.status(201).json(newCountry);
      } else {
        res.status(401).json({statusText: 'Unauthorized'})
      }
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getCountrySchema, "params"),
  validatorHandler(updateCountrySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const country = await service.update(id, body);
      res.json(country);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getCountrySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
