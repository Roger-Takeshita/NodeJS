const User = require('../models/user');
const Task = require('../models/task');
const { createJWT } = require('../middlewares/auth');

const getUsers = async (req, res) => {
    try {
        res.send(await User.find({}, '-__v'));
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-__v');
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }, '-__v');
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const newUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await createJWT(user);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const updateUser = async (req, res) => {
    const bodyFields = Object.keys(req.body);
    const allowedFields = ['name', 'email', 'password', 'age'];
    const isValidOperation = bodyFields.every((field) => allowedFields.includes(field));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid Updates!' });

    try {
        //! the find by id and update method bypasses moongose
        //! It performs a direct operation on the database
        //+ this means that our middleware won't be executed
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // });

        const user = await User.findOne({ _id: req.user._id }, '-__v');
        bodyFields.forEach((field) => (user[field] = req.body[field]));
        await user.save();

        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.user._id });
        if (!user) return res.status(404).send({ error: 'User not found' });
        await Task.deleteMany({ user: req.user._id });
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }, '-__v');
        if (!user) return res.status(404).send({ message: "User doesn't exist" });
        console.log(user);
        user.comparePassword(req.body.password, async (error, isMatch) => {
            if (!isMatch || error) return res.status(400).send({ message: 'Unable to login' });
            const token = await createJWT(user);
            res.send({ user, token });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

module.exports = {
    getUsers,
    getUser,
    getUserProfile,
    newUser,
    updateUser,
    deleteUser,
    loginUser
};
