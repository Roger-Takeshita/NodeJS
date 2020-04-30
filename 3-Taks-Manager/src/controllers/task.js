const Task = require('../models/task');

const getTasks = async (req, res) => {
    try {
        const match = req.query.completed ? { completed: req.query.completed } : {};
        const splitSort = req.query.sortBy ? req.query.sortBy.split(':') : [];
        const sort = req.query.sortBy ? { [splitSort[0]]: splitSort[1] } : {};
        res.send(
            await Task.find({ user: req.user._id })
                .where(match)
                .limit(parseInt(req.query.limit))
                .skip(parseInt(req.query.skip))
                .sort(sort)
        );
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id }).populate('user');
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const newTask = async (req, res) => {
    try {
        const task = new Task({ ...req.body, user: req.user._id });
        res.status(201).send(await task.save());
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const updateTask = async (req, res) => {
    const bodyFields = Object.keys(req.body);
    const allowedFields = ['description', 'completed'];
    const isValideOperation = bodyFields.every((field) => allowedFields.includes(field));

    if (!isValideOperation) return res.status(400).send({ error: 'Invalid Fields' });

    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) return res.status(404).send();
        bodyFields.find((field) => (task[field] = req.body[field]));
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
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
