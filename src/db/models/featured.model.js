const { Model, DataTypes, Sequelize } = require("sequelize");
const { PROPERTY_TABLE } = require("./property.model");
const FEATURED_TABLE = "featured";

const FeaturedSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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

class Featured extends Model {
    static associate(models) {
          this.belongsTo(models.Property, { as: "property" });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: FEATURED_TABLE,
      modelName: "Featured",
      timestamps: false,
    };
  }
}

module.exports = {
  FEATURED_TABLE,
  FeaturedSchema,
  Featured,
};
