const Task = require('../models/task');

const getTasks = async (req, res) => {
    try {
        res.send(await Task.find({}));
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const newTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        res.status(201).send(await task.save());
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const updateTask = async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFields = ['description', 'completed'];
    const isValideOperation = fields.every((field) => allowedFields.includes(field));

    if (!isValideOperation) return res.status(400).send({ error: 'Invalid Fields' });

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send({ error: 'Task not found' });
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

module.exports = {
    getTasks,
    getTask,
    newTask,
    updateTask,
    deleteTask
};
