const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  return res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
const updateGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const updated = await Goal.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { text },
    { new: true },
  );
  if (!updated) {
    res.status(404);
    throw new Error("Goal not found or not authorized");
  }
  res.status(200).json(updated);
});
const deleteGoal = asyncHandler(async (req, res) => {
  const deleted = await Goal.findOneAndDelete({
    _id: req.params.id, // it is much simplier and less written
    user: req.user.id, //it asks to get goal where user is req.user.id;
  });
  if (!deleted) {
    res.status(404);
    throw new Error("Goal not found or not autorized");
  }
  return res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
