const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Section = require("./sectionModel");

const Book = db.define(
  "book",
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    year: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      validator: {
        is: /(1[0-9]{3})|(20[0-9]{2})/,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    debtedNumber: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
  }
);

module.exports = Book;
