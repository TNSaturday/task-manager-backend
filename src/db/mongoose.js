const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
});

const user = new User({
   name: 'Marina',
   age: 28,
});

const task = new Task({
    description: 'Buy new keyboard',
    completed: false,
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log('Error!', error);
});
