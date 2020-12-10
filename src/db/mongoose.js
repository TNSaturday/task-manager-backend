const mongoose = require('mongoose');
const validator = require('validator');

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
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Error is incorrect!');
            }
        }
    }
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
    name: 'Kolya',
    age: 29,
    email: 'nnsaturday@mail.ru'
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
