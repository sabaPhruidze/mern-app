const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const connectDB = require("../config/db");
const userRoutes = require("../routes/userRoutes");
const goalRoutes = require("../routes/goalRoutes");
const { notFound, errorHandler } = require("../middleware/errorMiddleware");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db (serverless-შიაც მუშაობს; თუ გინდა, შემდეგ ქეშირებასაც დაგიწერ)
connectDB();

app.get("/", (req, res) => res.send("Api is running..."));

app.use("/api/users", userRoutes);
app.use("/api/goals", goalRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
