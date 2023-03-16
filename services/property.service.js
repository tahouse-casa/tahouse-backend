const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const FavoritesService = require("../services/favorites.service");
const service = new FavoritesService();
const Cloud = require("@google-cloud/storage");
const { Storage } = Cloud;
const { config } = require("../config/config");

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

  async upload(image) {
    return new Promise((resolve, reject) => {
      const { originalname, buffer } = image;

      const cloudStorage = new Storage({
        keyFilename: `${__dirname}/assets/service_account_key.json`,
        projectId: config.key_storage_project_id,
      });

      const bucketName = "dev-tahouse-static";

      const bucket = cloudStorage.bucket(bucketName);

      const blob = bucket.file(originalname);

      const blobStream = blob.createWriteStream();

      blobStream
        .on("finish", () => {
          const publicUrl = `https:storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log("mirar", publicUrl);
          resolve({
            success: true,
            url: publicUrl,
          });
        })
        .on("error", () => {
          reject({
            success: false,
            message: "Something be bad.",
          });
        })
        .end(buffer);
    });
  }
}

module.exports = PropertyService;
