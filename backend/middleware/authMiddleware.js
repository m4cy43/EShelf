// Authorization middleware
// Protecting routes

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authProtection = asyncHandler(async (req, res, next) => {
    let token;

    // Check the authorization in headers
    // Check the authorization starts with "Bearer" ("auth": `Bearer *token*`) 
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        try {
            // Get the token from header
            // Get rid of `Bearer` in authorization
            token = req.headers.authorization.split(' ')[1];

            // Verificate the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get the user from the token
            // Filter the `password` line from User object
            req.user = await User.findByPk(decoded.uuid, {attributes: { exclude: ['password'] }})

            // Call next function in the middleware
            next();

        }
        catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    // If token missed
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
});

module.exports = authProtection;
