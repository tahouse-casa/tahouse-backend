const { Model, DataTypes, Sequelize } = require("sequelize");

const COUNTRIES_TABLE = "countries";

const CountriesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  latitud: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  longitud: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
};

class Countries extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: COUNTRIES_TABLE,
      modelName: "Countries",
      timestamps: false,
    };
  }
}

module.exports = { COUNTRIES_TABLE, CountriesSchema, Countries };
