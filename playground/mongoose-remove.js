const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');  
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
    console.log(result);
});

// Todo.findOneAndRemove()

Todo.findOneAndRemove({
    _id: new ObjectID('5a5243244fd3b2a2ef3bf1f0')
}).then((todo) => {
    console.log(todo)
});

Todo.findByIdAndRemove('5a5243244fd3b2a2ef3bf1f0').then((doc) => {
    console.log(doc);
});