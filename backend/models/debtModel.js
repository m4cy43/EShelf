const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config/db");

const User = require("./userModel");
const Book = require("./bookModel");

const Debt = db.define(
  "debt",
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDebted: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    deadlineDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    bookUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Book,
        key: "uuid",
      },
    },
    userUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "uuid",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Debt;