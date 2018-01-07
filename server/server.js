const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => { 
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });

    console.log(req.body);
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (error) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send('Id not valid.');
    }
    
    Todo.findById(id).then((todo) => {
        if(!todo) return res.status(400).send('Todo not found.') ;
        res.send(todo);
    }).catch((error) => res.status(400).send(error));

});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(400).send('Invalid id.');

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) return res.status(404).send();

        res.status(200).send(todo);
    }).catch((err) => {    
        res.status(404).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) return res.status(400).send('Invalid id.');

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send()
        }

        res.send({todo});
    }).catch((error) => {
        res.status(400).send();
    }); 

})



app.listen(port, () => {
    console.log('Started on port ', port);
});

// var usuario = new User({
//     email: '  thiagoarmede@gmail.com'
// });

// usuario.save().then((doc) => {
//     console.log('Saved user: ', doc);
// }, (error) => {
//     console.log('Error: ', error);
// });


