const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    allDay: {
        type: Boolean,
        default: true
    },
    start: {
        type: String,
        required: true
    }, 
    end: {
        type: String,
        required: true
    }, 
    house: {
      type: String, 
      required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);