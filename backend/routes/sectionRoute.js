const express = require("express");
const router = express.Router();
const {
  getAllSections,
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");

// Auth middleware
// Routes protection
const authProtection = require("../middleware/authMiddleware");

// GET /api/section
// POST /api/section
router.route("/").get(getAllSections).post(authProtection, createSection);
// PUT /api/section/{uuid}
// DELETE /api/section/{uuid}
router.route("/:uuid").put(authProtection, updateSection).delete(authProtection, deleteSection);

module.exports = router;
