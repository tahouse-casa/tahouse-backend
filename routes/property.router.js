const express = require("express");
const PropertyService = require("./../services/property.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  updatePropertySchema,
  createPropertySchema,
  getPropertySchema,
} = require("./../schemas/property.schema");
const passport = require("passport");
const { checkRoles } = require("./../middlewares/auth.handler");
const router = express.Router();
const service = new PropertyService();

router.get("/", async (req, res, next) => {
  try {
    const query = req.query;
    const properties = await service.find(query);
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getPropertySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await service.findOne(id);
      res.json(property);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(createPropertySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProperty = await service.create(body);
      res.status(201).json(newProperty);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getPropertySchema, "params"),
  validatorHandler(updatePropertySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const property = await service.update(id, body);
      res.json(property);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getPropertySchema, "params"),
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
