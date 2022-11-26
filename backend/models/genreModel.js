const { Sequelize, DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Genre = db.define(
  "genre",
  {
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
