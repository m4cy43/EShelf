const { Sequelize, DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Section = db.define(
  "section",
  {
    sectionName: {
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

module.exports = Section;
