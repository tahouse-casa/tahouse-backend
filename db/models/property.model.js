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
    /*this.hasOne(models.Customer, {
        as: "customer",
        foreignKey: "userId",
      });*/
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
