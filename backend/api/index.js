const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const connectDB = require("../config/db");
const userRoutes = require("../routes/userRoutes");
const goalRoutes = require("../routes/goalRoutes");
const { notFound, errorHandler } = require("../middleware/errorMiddleware");

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "https://mern-53pdfvbu3-sabaphruidzes-projects.vercel.app",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.get("/", (req, res) => res.send("Api is running..."));

app.use("/api/users", userRoutes);
app.use("/api/goals", goalRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
