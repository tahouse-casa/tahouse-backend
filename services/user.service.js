const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const { models } = require("../libs/sequelize");

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    delete newUser.dataValues.recoveryToken;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    const newrta = rta.map((item) => {
      delete item.dataValues.password;
      delete item.dataValues.recoveryToken;
      return item;
    });
    return newrta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
    });
    return rta;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    if (changes.password) {
      const hash = await bcrypt.hash(changes.password, 10);
      changes.password = hash;
    }
    const rta = await user.update(changes);
    delete rta.dataValues.password;
    delete rta.dataValues.recoveryToken;
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
