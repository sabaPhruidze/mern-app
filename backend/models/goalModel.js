const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,//users ID Will be saved here?
            required:true,
            ref:'User' // telling with which model it is connected
        },
        text: {
            type:String,
            required:[true,'Please add a text value']
        }
    },
    {
        timestamps:true,
    }
)
module.exports = mongoose.model('Goal',goalSchema)