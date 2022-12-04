const asyncHandler = require("express-async-handler");
const Genre = require("../models/genreModel");

// Get all genres
// GET /api/genre
// Private
const getAllGenres = asyncHandler(async (req, res) => {
  const allGenres = await Genre.findAll();
  res.status(200).json(allGenres);
});

// Create an genre
// POST /api/genre
// Private
const createGenre = asyncHandler(async (req, res) => {
  // Check the content exists
  if (!req.body.genreName) {
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

  // Create the genre
  const genre = await Genre.create({
    genreName: req.body.genreName,
  });
  res.status(201).json(genre);
});

// Update an genre
// PUT /api/genre/{uuid}
// Private
const updateGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findByPk(req.params.uuid);

  // Check the genre exists
  if (!genre) {
    throw new Error("There is no such genre");
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

  // Update the genre
  genre.set(req.body);
  await genre.save();
  res.status(200).json(genre);
});

// Delete an genre
// DELETE /api/genre/{uuid}
// Private
const deleteGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findByPk(req.params.uuid);

  // Check the genre exists
  if (!genre) {
    throw new Error("There is no such genre");
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

  // Delete genre
  await genre.destroy();
  res.status(200).json({ uuid: req.params.uuid });
});

module.exports = {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
