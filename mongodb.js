const { MongoClient, ObjectID } = require('mongodb');

// Start MongoDB command, cmder must be ran with administrator rights
// mongod -dbpath="C:\Program Files\mongodb-data"

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true,  useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database');
    }

    const db = client.db(databaseName);

    // db.collection('tasks').insertOne({
    //     _id: new ObjectID(),
    //     description: 'Sync up with Nikita',
    //     completed: false
    // }, (error, result) => {
    //     console.log(result.ops);
    // });


    db.collection('tasks').findOne({_id: new ObjectID('5fd019da0378cf300848ea93')}, (error, task) => {
        if (error) {
            return console.log('No such task!');
        }

        console.log(task);
    });

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log('No uncompleted tasks found!');
    //     }
    //
    //     console.log(tasks);
    // });

});
