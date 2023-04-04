const { Model, DataTypes, Sequelize } = require("sequelize");
const { PROPERTY_TABLE } = require("./property.model");
const { USER_TABLE } = require("./user.model");
const FAVORITES_TABLE = "favorites";

const FavoritesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    field: "user_id",
    allowNull: false,
    unique: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  propertyId: {
    field: "property_id",
    allowNull: true,
    unique: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROPERTY_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Favorites extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: FAVORITES_TABLE,
      modelName: "Favorites",
      timestamps: false,
    };
  }
}

module.exports = {
  FAVORITES_TABLE,
  FavoritesSchema,
  Favorites,
};
