const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel'); // in order to check if user already exists or not

const getGoals = asyncHandler(async(req,res) => {
    const goals = await Goal.find({user:req.user.id});
    res.status(200).json(goals);
})

const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }
    const goal = await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal)
});
const deleteGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal) {
        req.status(400);
        throw new Error('Goal not found')
    }
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //now will check if the real owner wants to remove it
    // goal.user is an object
    if(goal.user.toString() !==req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.deleteOne();
})

module.exports = {
    getGoals,setGoal,deleteGoal
}