const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");
const FavoritesService = require("../services/favorites.service");

const service = new FavoritesService();
class PropertyService {
  constructor() {}

  async create(data) {
    const valuesType = [
      "Casa",
      "Departamento",
      "Hotel",
      "Terreno",
      "Monoambiente",
    ];
    const viewValueType = valuesType.includes(data.type);
    if (viewValueType) {
      const newProperty = await models.Property.create(data);
      return newProperty;
    } else {
      throw boom.badData("type not valid");
    }
  }

  async find(query) {
    const { limit, offset } = query;
    const options = {
      where: {},
    };
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const rta = await models.Property.findAll(options);
    return rta;
  }

  async findOne(id) {
    const property = await models.Property.findByPk(id);
    if (!property) {
      throw boom.notFound("property not found");
    }
    return property;
  }

  async update(id, changes) {
    const property = await this.findOne(id);
    const rta = await property.update(changes);
    return rta;
  }

  async delete(id) {
    const property = await this.findOne(id);
    const allPropertiesLiked = await service.find();
    const filterIfExist = allPropertiesLiked.filter(
      (item) => item.dataValues.propertyId === property.id
    );
    if (filterIfExist) {
      filterIfExist.forEach(async (item) => {
        await service.delete(item.dataValues.id);
      });
    }
    await property.destroy();
    return { id };
  }
}

module.exports = PropertyService;
