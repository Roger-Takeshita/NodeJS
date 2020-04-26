const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

//! Create a new task
// const task = new Task({
//     description: ' teste 2     '
// });

// task.save()
//     .then((doc) => console.log(doc))
//     .catch((error) => console.log(error));

module.exports = Task;
