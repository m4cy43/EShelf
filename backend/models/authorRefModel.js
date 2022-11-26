const { Sequelize, DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Author = require("./authorModel");
const Book = require("./bookModel");

const AuthorRef= db.define(
  "author_ref",
  {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id'
      }
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Author,
          key: 'id'
        }
      },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = AuthorRef;
