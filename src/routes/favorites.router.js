const express = require("express");
const FavoritesService = require("../services/favorites.service");
const validationHandler = require("../middlewares/validator.handler");
const {
  createFavoriteSchema,
  getFavoriteSchema,
} = require("../schemas/favorites.schema");

const router = express.Router();
const service = new FavoritesService();

router.get("/", async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validationHandler(createFavoriteSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validationHandler(getFavoriteSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
