const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");
const connectDB = require("./src/config/db");
require("dotenv").config();

// Connect Database
connectDB();

// cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// Init Middleware
app.use(express.json());
app.use(express.json({ extended: false }));
// work only in development mode
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
// Rendering the static files
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
