const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class FeaturedService {
  constructor() {}

  async create(data) {
    const allFeatured = await this.find('noOrder');
    const viewIfExist = allFeatured.filter(
      (item) =>
        item.propertyId === data.propertyId
    );

    if (viewIfExist.length > 0) {
      throw boom.badRequest("already exist");
    } else if (allFeatured.length >= 5) {
      const id = allFeatured[0].id
      const deleteOld = await this.delete(id)
      if (deleteOld) {        
        const newFeatured = await models.Featured.create(data);
        return newFeatured;
      }
    } else {
      const newFeatured = await models.Featured.create(data);
      return newFeatured;
    }
  }

  async find(noOrder) {
    const rta = await models.Featured.findAll({
      include: ["property"]
    });
      if (noOrder) {
          return rta
      }
      const order = rta.sort((a, b) => {
          if (a.property.price < b.property.price) {
              return -1
          }
          if (a.property.price > b.property.price) {
              return 1
          }
          return 0
      })
    return order;
  }
    
  async findOne(id) {
    const rta = await models.Featured.findByPk(id, {
      include: ["property"]
    });
    return rta;
  }
  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { id };
  }
}

module.exports = FeaturedService;