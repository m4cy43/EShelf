const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");

// Auth middleware
// Routes protection
const authProtection = require("../middleware/authMiddleware");

// GET /api/genre
// POST /api/genre
router.route("/").get(getAllGenres).post(authProtection, createGenre);
// PUT /api/genre/{uuid}
// DELETE /api/genre/{uuid}
router
  .route("/:uuid")
  .put(authProtection, updateGenre)
  .delete(authProtection, deleteGenre);

module.exports = router;
