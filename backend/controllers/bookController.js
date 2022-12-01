const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const Section = require("../models/sectionModel");
const Author = require("../models/authorModel");
const Genre = require("../models/genreModel");
const Debt = require("../models/debtModel");
const { Op } = require("sequelize");

// Get all books
// GET /api/book
// Private
const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await Book.findAll({
    include: [{ model: Section }, { model: Author }, { model: Genre }],
  });
  res.status(200).json(allBooks);
});

// Get simply books by title name
// GET /api/book/find
// Private
const getSimplyBooks = asyncHandler(async (req, res) => {
  let books = await Book.findAll({
    include: [{ model: Section }, { model: Author }, { model: Genre }],
  });
  if (req.body.title && req.body.title !== "") {
    books = await books.findAll({
      where: { title: { [Op.substring]: req.body.title } },
    });
  }
  res.status(200).json(books);
});

// Get recursively books
// GET /api/book/rfind
// Private
const getRecursivelyBooks = asyncHandler(async (req, res) => {
  let books = await Book.findAll({
    include: [{ model: Section }, { model: Author }, { model: Genre }],
  });
  if (req.body.title && req.body.title !== "") {
    books = await books.findAll({
      where: { title: { [Op.substring]: req.body.title } },
    });
  }
  if (req.body.author && req.body.author !== "") {
    books = await books.findAll({
      where: { author: { [Op.substring]: req.body.author } },
    });
  }
  if (req.body.year && req.body.year !== "") {
    books = await books.findAll({
      where: { year: { [Op.substring]: req.body.year } },
    });
  }
  if (req.body.genres && req.body.genres !== "") {
    books = await books.findAll({
      where: { genres: { [Op.substring]: req.body.genres } },
    });
  }
  if (req.body.section && req.body.section !== "") {
    books = await books.findAll({
      where: { section: { [Op.substring]: req.body.section } },
    });
  }
  res.status(200).json(books);
});

// Create a book
// POST /api/book
// Private
const createBook = asyncHandler(async (req, res) => {
  // Check the content exists
  if (
    !req.body.title &&
    !req.body.year &&
    !req.body.description &&
    !req.body.number &&
    !req.body.debtedNumber
  ) {
    res.status(400);
    throw new Error("Content required");
  }

  // Check the associations exists
  if (!req.body.section && !req.body.genres && !req.body.author) {
    res.status(400);
    throw new Error("Content required");
  }
  // Create the book
  const book = await Book.create({
    title: req.body.title,
    year: req.body.year,
    description: req.body.description,
    number: req.body.number,
    debtedNumber: req.body.debtedNumber,
  });

  // Create associations
  let section = await Section.findByPk(req.body.section);
  let authors = await Author.findAll({
    where: { uuid: { [Op.or]: req.body.author } },
  });
  let genres = await Genre.findAll({
    where: { uuid: { [Op.or]: req.body.genres } },
  });
  console.log(genres);

  await section.addBook(book);
  await book.addAuthors(authors);
  await book.addGenres(genres);

  res.status(201).json(book);
});

// Delete a book
// DELETE /api/book
// Private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.uuid);

  // Check the book exists
  if (!book) {
    throw new Error("There is no such book");
  }
  // Check the user exists
  if (!req.user) {
    res.status(401);
    throw new Error("There is no such user");
  }
  // Check the authorization
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  // Delete book
  await book.destroy();

  res.status(200).json({ id: req.params.uuid });
});

module.exports = {
  getAllBooks,
  getSimplyBooks,
  getRecursivelyBooks,
  createBook,
  deleteBook,
};
