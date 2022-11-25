const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAuthUser,
} = require("../controllers/userController");

// Auth middleware
// Routes protection
const authProtection = require('../middleware/authMiddleware');

// POST /api/user/signup
router.post("/signup", createUser);
// POST /api/user/login
router.post("/login", loginUser);
// GET /api/user/authuser
router.get("/authuser", authProtection, getAuthUser);

module.exports = router;