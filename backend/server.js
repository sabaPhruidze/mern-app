const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const goalR = require('./routes/goalRoutes')
dotenv.config();
connectDB();

// Middleware
app.use('/api/goals',goalR)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); //in order to react connect

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`http://localhost:${PORT}/api/users`));
