const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const Section = require("../models/sectionModel");
const Author = require("../models/authorModel");
const Genre = require("../models/genreModel");

// Get all books
// GET /api/book
// Private
const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await Book.findAll();
  res.status(200).json(allBooks);
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

  // Create the book
  const book = await Book.create({
    user: req.user.id,
    content: req.body.content,
  });
  res.status(201).json(book);
});

// Update a book
// PUT /api/book
// Private
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

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

  // Update the book
  const updBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updBook);
});

// Delete a book
// DELETE /api/book
// Private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

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
  await book.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
};
