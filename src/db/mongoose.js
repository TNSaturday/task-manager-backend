const mongoose = require('mongoose');
const validator = require('validator');

// mongod -dbpath="C:\Program Files\mongodb-data"

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
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"!');
            }
        }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    },
});

// const user = new User({
//     name: 'Roma',
//     age: 30,
//     email: 'aloneinbox@mail.ru',
//     password: 'testtest222'
// });

const task = new Task({
    description: 'Buy new keyboard'
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log('Error!', error);
});
