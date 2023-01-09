const path = require('path');
const express = require("express");
const dotenv = require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 5000;
const app = express();

const { db, tableSync } = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

// Request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/author", require("./routes/authorRoute"));
app.use("/api/section", require("./routes/sectionRoute"));
app.use("/api/genre", require("./routes/genreRoute"));
app.use("/api/book", require("./routes/bookRoute"));
app.use("/api/debt", require("./routes/debtRoute"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Set NODE_ENV to production mode"));
}

// Error middleware
app.use(errorHandler);

// DB connection and sync test
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));
tableSync();

// Port listening
app.listen(port, () => console.log(`Port: ${port}`));
