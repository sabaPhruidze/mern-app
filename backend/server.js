const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const goalR = require("./routes/goalRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();

// Middleware
app.use(cors()); //in order to react connect
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", goalR);

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/users", require("./routes/userRoutes"));
// central error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}/api/users`));
