//mongoschema for task

var mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    dueDate: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

const Task=mongoose.model('Task', taskSchema);

module.exports=Task;