const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to database server');
    }

    console.log('Connected to mongodb servers!')
    const db = client.db('TodoApp');
    
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5a513c2127d4ce7b86fc84e3')
    }, {
        $set:{
            completed: true
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a5132ed9909fa24b8b36df9')
    }, {
        $set:{
            name: 'Thiago Teste'
        },
        $inc:{
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });


    //client.close();
});




