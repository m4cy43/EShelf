const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Create new user
// GET /api/user/signup
// Public
const createUser = asyncHandler(async (req, res) => {
  const {email, password, name, surname, phone} = req.body;

  // Check the value
  if(!email || !password || !name || !surname || !phone){
    res.status(400);
    throw new Error('Value is missing');
  }

  // Check if user exists by email
  const checkIfUserExists = await User.findOne({where: {email}});
  if (checkIfUserExists){
    res.status(400);
    throw new Error("The user already exists");
  }

  // Encryption & hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password.toString(), salt);

  // Create new user
  const user = await User.create({
    email: email,
    password: hash,    
    name: name,
    surname: surname,
    phone: phone
  });
  if (user) {
    res.status(201).json({
      id: user.id,
      email: user.email,
      token: generateJWT(user.id)
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
  const user = await User.findOne({where: {email}});
  if (user && (await bcrypt.compare(password, user.password))){
    res.json({
      id: user.id,
      email: user.email,
      token: generateJWT(user.id)
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
