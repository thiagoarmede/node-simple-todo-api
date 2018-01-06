const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to database server');
    }

    console.log('Connected to mongodb servers!')
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     completed: false
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch Todos');
    // });

    // db.collection('Todos').find({
    //     completed: false
    // }).count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch Todos');
    // });

    db.collection('Users').find({
        name: 'Thiago Armede'
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log('Unable to fetch users.');
    });

    //client.close();
});




