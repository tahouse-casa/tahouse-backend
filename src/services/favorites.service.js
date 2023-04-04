const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class FavoritesService {
  constructor() {}

  async create(data) {
    const allFavorites = await this.find();
    const viewIfExist = await allFavorites.filter(
      (item) =>
        item.propertyId === data.propertyId && item.userId === data.userId
    );
    if (viewIfExist.length > 0) {
      throw boom.badRequest("already exist");
    } else {
      const newFavorite = await models.Favorites.create(data);
      return newFavorite;
    }
  }

  async find() {
    const rta = await models.Favorites.findAll();
    return rta;
  }
  async findOne(id) {
    const rta = await models.Favorites.findByPk(id);
    return rta;
  }
  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { id };
  }
}

module.exports = FavoritesService;
