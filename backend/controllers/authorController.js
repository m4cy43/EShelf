const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");

// Get all authors
// GET /api/author
// Private
const getAllAuthors = asyncHandler(async (req, res) => {
  const allAuthors = await Author.findAll();
  res.status(200).json(allAuthors);
});

// Create an author
// POST /api/author
// Private
const createAuthor = asyncHandler(async (req, res) => {
  // Check the content exists
  if (!req.body.name && !req.body.surname && !req.body.middlename) {
    res.status(400);
    throw new Error("Content required");
  }

  // Check auth
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  // Create the author
  const author = await Author.create({
    name: req.body.name,
    surname: req.body.surname,
    middlename: req.body.middlename,
  });
  res.status(201).json(author);
});

// Update an author
// PUT /api/author/{uuid}
// Private
const updateAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByPk(req.params.uuid);

  // Check the author exists
  if (!author) {
    throw new Error("There is no such author");
  }

  // Check auth
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  // Update the author
  author.set(req.body);
  await author.save();
  res.status(200).json(author);
});

// Delete an author
// DELETE /api/author/{uuid}
// Private
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByPk(req.params.uuid);

  // Check the author exists
  if (!author) {
    throw new Error("There is no such author");
  }

  // Check auth
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  // Delete author
  await author.destroy();
  res.status(200).json({ uuid: req.params.uuid });
});

module.exports = {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
