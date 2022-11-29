const express = require("express");
const router = express.Router();
const {
  getAllSections,
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");

// GET /api/section
// POST /api/section
router.route("/").get(getAllSections).post(createSection);
// PUT /api/section/{uuid}
// DELETE /api/section/{uuid}
router.route("/:uuid").put(updateSection).delete(deleteSection);

module.exports = router;
