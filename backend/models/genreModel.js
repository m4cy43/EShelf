const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Genre = db.define(
  "genre",
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    genreName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Genre;
