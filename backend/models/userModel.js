const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is necessary"] },
    email: {
      type: String,
      required: [true, "Email is necessary"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is necessary"] },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", userSchema);
