const express = require("express");
const router = express.Router();
const {
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

// GET /api/author
// POST /api/author
router.route("/").get(getAuthor).post(createAuthor);
// PUT /api/author/{uuid}
// DELETE /api/author/{uuid}
router.route("/:uuid").put(updateAuthor).delete(deleteAuthor);

module.exports = router;
