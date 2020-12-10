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
        required: true,
        validate(value) {
            if (value < 1) {
                throw new Error('Age must be at least one!');
            }
        }
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
   name: 'Taras',
   age: 29,
});

const task = new Task({
    description: 'Buy new keyboard',
    completed: false,
});

user.save().then(() => {
    console.log(user);
}).catch((error) => {
    console.log('Error!', error);
});
