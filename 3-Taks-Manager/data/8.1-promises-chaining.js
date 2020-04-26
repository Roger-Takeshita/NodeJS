require('../src/config/database');
const User = require('../src/models/user');
const Task = require('../src/models/task');

//! Update document and then count the number of the documents with the updated field
User.findByIdAndUpdate('5ea5f9362d7cd58fc7965fcf', { age: 3 })
    .then((user) => {
        console.log(user);
        return User.countDocuments({ age: 3 });
    })
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log(error);
    });

//! Finde by id and delete, then count the number of documents
Task.findByIdAndDelete('5ea5ec98789bad8acf53c625')
    .then((task) => {
        console.log(task);
        return Task.countDocuments({ completed: false });
    })
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log(error);
    });
