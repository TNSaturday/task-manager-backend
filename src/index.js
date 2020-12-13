const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.send(user);
    }).catch((error) => {
       console.log(error);
    });
});

app.get('/users', (re, res) => {
    User.find({})
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).send();
            }

            res.send(user);
        })
        .catch((error) => {
            res.status(500).send();
        });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.send(task);
    }).catch((error) => {
        console.log(error);
    });
});

app.get('/tasks', (re, res) => {
    Task.find({})
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id)
        .then((task) => {
            if (!task) {
                return res.status(404).send();
            }

            res.send(task);
        })
        .catch((error) => {
            res.status(500).send();
        });
});

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});
