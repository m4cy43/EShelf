const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Create new user
// GET /api/user/signup
// Public
const createUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  // Check the value
  if(!name || !email || !password){
    res.status(400);
    throw new Error('Value is missing');
  }

  // Check if user exists by email
  const checkIfUserExists = await User.findOne({email});
  if (checkIfUserExists){
    res.status(400);
    throw new Error("The user already exists");
  }

  // Encryption & hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password.toString(), salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hash
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login user
// POST /api/user/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  // Get user by email
  // Check the password 
  const user = await User.findOne({email});
  if (user && (await bcrypt.compare(password, user.password))){
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Wrong email or password');
  }
});

// Check auth (dev private)
// POST /api/user/authuser
// Private
const getAuthUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});


// Auxiliary function
// Token generator: Creates JWT
const generateJWT = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

module.exports = {
  createUser,
  loginUser,
  getAuthUser,
};
