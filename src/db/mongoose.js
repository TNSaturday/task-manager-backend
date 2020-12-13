const mongoose = require('mongoose');

// mongod -dbpath="C:\Program Files\mongodb-data"

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


