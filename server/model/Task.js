const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    taskname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);