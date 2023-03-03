const boom = require("@hapi/boom");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
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
  
  async upload(image) {
    const multer = Multer({
      storage: Multer.memoryStorage(),
      limits: {
        fileSize: 5,
      },
    });
    const cloudStorage = new Storage({
      keyFilename: "", //${ __dirname } / service_account_key.json,
      projectId: "PROJECT_ID",
    });
    const bucketName = "YOUR_BUCKET_NAME";

    const bucket = cloudStorage.bucket(bucketName);

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      next(err);
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(
        "https:" //storage.googleapis.com/${bucket.name}/${blob.name}
      );
    });
  }
}

module.exports = PropertyService;
