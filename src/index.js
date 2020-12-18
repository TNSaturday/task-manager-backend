const express = require('express');
const cors = require('cors')
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/users', async(req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch(error) {
        res.status(400).send(error);
    }
});

app.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(error) {
        res.status(500).send();
    }
});

app.get('/users/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(error) {
        res.status(500).send();
    }
});

app.patch('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch(error) {
        res.status(500).send();
    }
});

app.post('/tasks', async(req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch(error) {
        res.status(400).send(error);
    }
});

app.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch(error) {
        res.status(500).send();
    }
});

app.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch(error) {
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}/users`);
});
