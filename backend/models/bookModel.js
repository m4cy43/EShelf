const { Sequelize, DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Section = require("./sectionModel");

const Book = db.define(
  "book",
  {
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
      }
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
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Section,
          key: 'id'
        }
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Book;
