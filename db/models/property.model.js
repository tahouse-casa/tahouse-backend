const { Model, DataTypes, Sequelize } = require("sequelize");

const PROPERTY_TABLE = "property";

const PropertySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  meters: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  rooms: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  environments: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  typeOperation: {
    field: "type_operation",
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "Alquiler",
  },
  bathrooms: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 100000,
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "Libre",
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "Casa",
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "3012905676",
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "ideaBonplant@gmail.com",
  },
  urlImage: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING),
    field: "url_image",
    defaultValue: [""],
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.fn("NOW"),
  },
};

class Property extends Model {
  static associate(models) {
      this.hasOne(models.Featured, {as: 'featured', foreignKey: 'propertyId'})
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PROPERTY_TABLE,
      modelName: "Property",
      timestamps: false,
    };
  }
}

module.exports = { PROPERTY_TABLE, PropertySchema, Property };
