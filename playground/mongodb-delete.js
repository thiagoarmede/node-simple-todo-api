const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to database server');
    }

    console.log('Connected to mongodb servers!')
    const db = client.db('TodoApp');

    db.collection('Todos').deleteMany({
        text: 'Eat lunch'
    }).then((result) => {
        console.log('Okay!');
    }, (error) => {
        console.log('Error!');
    });

    db.collection('Todos').deleteOne({
        text: 'Eat lunch'
    }).then((result) => {
        console.log(result);
    }, (error) => {
        console.log(error.message); 
    });

    db.collection('Todos').findOneAndDelete({
        completed: false
    }).then((result) => {
        console.log(result);
    });
    


    //client.close();
});




