const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class FavoritesService {
  constructor() {}

  async create(data) {
    const newFavorite = await models.Favorites.create(data);
    return newFavorite;
  }

  async find() {
    const rta = await models.Favorites.findAll();
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { id };
  }
}

module.exports = FavoritesService;
