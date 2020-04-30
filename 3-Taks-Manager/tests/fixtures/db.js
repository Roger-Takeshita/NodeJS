const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

class NewUser {
    constructor(name, email, password) {
        this._id = mongoose.Types.ObjectId();
        this.name = name;
        this.email = email;
        this.password = password;
        this.token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    }
}

class NewTask {
    constructor(description, completed, user) {
        this._id = new mongoose.Types.ObjectId();
        this.description = description;
        this.completed = completed;
        this.user = user;
    }
}

const userOne = new NewUser('Mike', 'mike.cabecinha@gmail.com', 'bananinha');
const userTwo = new NewUser('Thaisa', 'thaisa@gmail.com', 'bananinha');
const taskOne = new NewTask('First Task', false, userOne._id);
const taskTwo = new NewTask('Second Task', false, userOne._id);
const taskThree = new NewTask('Thrid Task', false, userTwo._id);

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
};
