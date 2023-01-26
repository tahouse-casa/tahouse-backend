const express = require("express");
const featuredService = require("../services/featured.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  createFeaturedSchema,
  getFeaturedSchema,
} = require("../schemas/featured.schema");
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const router = express.Router();
const service = new featuredService();

router.get("/", async (req, res, next) => {
  try {
    const featured = await service.find();
    res.json(featured);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getFeaturedSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const featured = await service.findOne(id);
      res.json(featured);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
    "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(createFeaturedSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newFeatured = await service.create(body);
      res.status(201).json(newFeatured);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getFeaturedSchema, "params"),
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
