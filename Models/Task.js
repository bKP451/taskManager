const mongoose = require('mongoose')
const {Schema} = mongoose;

const taskSchema = new Schema({
    name:{
        type:String,
        required:[true, 'you must provide name of the task'],
        trim:true,
        maxlength: [50, 'Confine your task to maximum of 50 words']
    },
    completed:{
        type:Boolean,
        default:false
    }
})


const Task = mongoose.model('Task', taskSchema)

module.exports = Task