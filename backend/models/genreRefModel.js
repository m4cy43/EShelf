const { Sequelize, DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Genre = require("./genreModel");
const Book = require("./bookModel");

const GenreRef= db.define(
  "genre_ref",
  {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id'
      }
    },
    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Genre,
          key: 'id'
        }
      },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = GenreRef;
