const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        res.send(await User.find({}));
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const newUser = async (req, res) => {
    try {
        const user = new User(req.body);
        res.status(201).send(await user.save());
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const updateUser = async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFields = ['name', 'email', 'password', 'age'];
    const isValidOperation = fields.every((field) => allowedFields.includes(field));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid Updates!' });

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send({ error: 'User not found' });
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

module.exports = {
    getUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser
};
