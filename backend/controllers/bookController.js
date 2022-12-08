const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const Section = require("../models/sectionModel");
const Author = require("../models/authorModel");
const Genre = require("../models/genreModel");
const { Op } = require("sequelize");

// Get all books
// GET /api/book
// Private
const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await Book.findAll({
    include: [{ model: Section }, { model: Author }, { model: Genre }],
    order: [["UpdatedAt", "DESC"]],
  });
  res.status(200).json(allBooks);
});

// Get all book info
// GET /api/book/one/{uuid}
// Private
const getBookByUuid = asyncHandler(async (req, res) => {
  if (!req.params.uuid) {
    res.status(400);
    throw new Error("Wrong query");
  }
  const theBook = await Book.findByPk(req.params.uuid, {
    include: [{ model: Section }, { model: Author }, { model: Genre }],
  });
  res.status(200).json(theBook);
});

// Get simply books by title name
// GET /api/book/find?title=_
// Private
const getSimplyBooks = asyncHandler(async (req, res) => {
  if (!req.query.title) {
    res.status(400);
    throw new Error("Wrong query");
  }
  const books = await Book.findAll({
    include: [{ model: Section }, { model: Author }, { model: Genre }],
    where: { title: { [Op.substring]: req.query.title } },
    order: [["UpdatedAt", "DESC"]],
  });
  res.status(200).json(books);
});

// Get books by advanced search
// GET /api/book/afind?title=_&author=_&year=_&genre=_&section=_
// Private
const getRecursivelyBooks = asyncHandler(async (req, res) => {
  const { title, author, year, genre, section } = req.query;
  if (!title || !author || !year || !genre || !section) {
    res.status(400);
    throw new Error("Wrong query");
  }
  const books = await Book.findAll({
    include: [{ model: Section }, { model: Author }, { model: Genre }],
    where: {
      title: { [Op.substring]: title },
      "$authors.surname$": { [Op.substring]: author },
      year: { [Op.substring]: year },
      "$genres.genreName$": { [Op.substring]: genre },
      "$section.sectionName$": { [Op.substring]: section },
    },
    order: [["UpdatedAt", "DESC"]],
  });
  res.status(200).json(books);
});

// Get all author's book
// GET /api/book/authorall/{uuid}
// Private
const getAuthorsBooks = asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    include: [{ model: Section }, { model: Author }, { model: Genre }],
    where: {
      "$authors.uuid$": req.params.uuid,
    },
    order: [["UpdatedAt", "DESC"]],
  });
  if (!books) {
    res.status(400);
    throw new Error("No books for this author or wrong query");
  }
  res.status(200).json(books);
});

// Create a book
// POST /api/book
// Private
const createBook = asyncHandler(async (req, res) => {
  // Check the content exists
  if (
    !req.body.title ||
    !req.body.year ||
    !req.body.description ||
    !req.body.number
  ) {
    res.status(400);
    throw new Error("Content required");
  }

  // Check the associations exists
  if (!req.body.section || !req.body.genres || !req.body.authors) {
    res.status(400);
    throw new Error("Content required");
  }

  // Check auth
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
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
    where: { uuid: { [Op.or]: req.body.authors } },
  });
  let genres = await Genre.findAll({
    where: { uuid: { [Op.or]: req.body.genres } },
  });

  await section.addBook(book);
  await book.addAuthors(authors);
  await book.addGenres(genres);

  const createdBook = await Book.findByPk(book.uuid, {
    include: [{ model: Section }, { model: Author }, { model: Genre }],
  });
  res.status(201).json(createdBook);
});

// Delete a book
// DELETE /api/book/one/{uuid}
// Private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.uuid);

  // Check the book exists
  if (!book) {
    throw new Error("There is no such book");
  }

  // Check auth
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  // Delete book
  await book.destroy();

  res.status(200).json({ id: req.params.uuid });
});

// Increase book num by one
// PUT /api/book/inc/{uuid}
// Private
const incBookNum = asyncHandler(async (req, res) => {
  let book = await Book.findByPk(req.params.uuid);
  // Check auth
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  book.number++;
  await book.save();
  res.status(200).json({ num: book.number });
});

// Increase book num by one
// PUT /api/book/dec/{uuid}
// Private
const decBookNum = asyncHandler(async (req, res) => {
  let book = await Book.findByPk(req.params.uuid);
  // Check auth
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  if (book.number <= 0) {
    book.number = 0;
    await book.save();
    res.status(200).json({ num: book.number });
  } else {
    book.number--;
    await book.save();
    res.status(200).json({ num: book.number });
  }
});

module.exports = {
  getAllBooks,
  getBookByUuid,
  getSimplyBooks,
  getRecursivelyBooks,
  getAuthorsBooks,
  createBook,
  deleteBook,
  incBookNum,
  decBookNum,
};
