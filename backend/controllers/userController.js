require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Fill all input" });
  }
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.getSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "User was not created" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Password or Email is incorrect" });
  }
};
module.exports = { loginUser, registerUser };
