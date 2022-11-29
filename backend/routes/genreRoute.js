const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");

// GET /api/genre
// POST /api/genre
router.route("/").get(getAllGenres).post(createGenre);
// PUT /api/genre/{uuid}
// DELETE /api/genre/{uuid}
router.route("/:uuid").put(updateGenre).delete(deleteGenre);

module.exports = router;
