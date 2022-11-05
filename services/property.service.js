const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class PropertyService {
  constructor() {}

  async create(data) {
    const newProperty = await models.Property.create(data);
    return newProperty;
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
    await property.destroy();
    return { id };
  }
}

module.exports = PropertyService;
