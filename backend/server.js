const express = require("express");
const dotenv = require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3000;
const app = express();

const db = require('./config/db');
const errorHandler = require("./middleware/errorMiddleware");

// Request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/user", require("./routes/userRoute"));

// Error middleware
app.use(errorHandler);

// DB connection test
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

// Port listening
app.listen(port, () => console.log(`Port: ${port}`));
